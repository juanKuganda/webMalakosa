import React from "react";

export default function AdminDashboardPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-200/80 max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl font-bold">
          M
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-bold text-zinc-950">Malakosa CMS Dashboard</h1>
          <p className="text-zinc-600 font-sans text-sm leading-relaxed">
            Halaman ini adalah placeholder untuk Content Management System (CMS) Desa Malakosa di masa mendatang.
          </p>
        </div>
        <div className="pt-2">
          <a
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all"
          >
            Kembali ke Landing Page
          </a>
        </div>
      </div>
    </div>
  );
}
