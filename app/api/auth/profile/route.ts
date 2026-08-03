import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getSession, createSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: session.userId as string },
      select: { id: true, username: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Sesi telah berakhir, silakan login kembali." }, { status: 401 });
    }

    const { currentPassword, newUsername, newPassword } = await req.json();

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Password saat ini wajib diisi untuk konfirmasi keamanan." },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: session.userId as string },
    });

    if (!user) {
      return NextResponse.json({ error: "Akun admin tidak ditemukan." }, { status: 404 });
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Password saat ini tidak sesuai / salah." },
        { status: 400 }
      );
    }

    const updateData: { username?: string; passwordHash?: string } = {};

    // Validate and prepare username change
    const trimmedUsername = newUsername ? newUsername.trim() : "";
    if (trimmedUsername && trimmedUsername !== user.username) {
      if (trimmedUsername.length < 3) {
        return NextResponse.json(
          { error: "Username minimal harus memiliki 3 karakter." },
          { status: 400 }
        );
      }

      // Check if username is already taken by another user
      const existingUser = await prisma.adminUser.findUnique({
        where: { username: trimmedUsername },
      });

      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json(
          { error: `Username "${trimmedUsername}" sudah digunakan oleh akun lain.` },
          { status: 400 }
        );
      }

      updateData.username = trimmedUsername;
    }

    // Validate and prepare password change
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Password baru minimal harus 6 karakter." },
          { status: 400 }
        );
      }

      const newHash = await bcrypt.hash(newPassword, 10);
      updateData.passwordHash = newHash;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Tidak ada perubahan username atau password yang dimasukkan." },
        { status: 400 }
      );
    }

    // Perform database update
    const updatedUser = await prisma.adminUser.update({
      where: { id: user.id },
      data: updateData,
    });

    // Refresh JWT session cookie with new username/userId
    await createSession({
      userId: updatedUser.id,
      username: updatedUser.username,
    });

    return NextResponse.json({
      success: true,
      message: "Data akun admin (username/password) berhasil diperbarui!",
      username: updatedUser.username,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Gagal memperbarui akun. Terjadi kesalahan server." }, { status: 500 });
  }
}
