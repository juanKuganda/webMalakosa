import React from "react";

interface OrganizationJsonLdProps {
  url?: string;
  name?: string;
}

export function OrganizationJsonLd({
  url = "https://www.malakosa.web.id",
  name = "Pemerintah Desa Malakosa",
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GovernmentOrganization",
        "@id": `${url}/#organization`,
        "name": name,
        "alternateName": [
          "Desa Malakosa",
          "Pemdes Malakosa",
          "Pemerintah Desa Malakosa Kec. Balinggi",
          "Website Resmi Desa Malakosa",
        ],
        "url": url,
        "logo": {
          "@type": "ImageObject",
          "url": `${url}/icon.png`,
          "width": "512",
          "height": "512",
        },
        "image": `${url}/icon.png`,
        "description":
          "Portal informasi resmi pemerintahan desa, potensi agraris, destinasi wisata pesisir, sejarah kebudayaan Kerajaan Balinggi, dan layanan masyarakat Desa Malakosa, Kecamatan Balinggi, Kabupaten Parigi Moutong, Sulawesi Tengah.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Balinggi",
          "addressRegion": "Sulawesi Tengah",
          "addressCountry": "ID",
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Desa Malakosa",
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "Kecamatan Balinggi, Kabupaten Parigi Moutong",
          },
        },
        "knowsAbout": [
          "Pemerintahan Desa",
          "Pertanian & Perkebunan Kakao/Kelapa/Cengkeh",
          "Wisata Bahari Teluk Tomini",
          "Tradisi Budaya Suku Kaili",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        "url": url,
        "name": "Website Resmi Desa Malakosa",
        "description": "Portal digital dan transparansi informasi publik Desa Malakosa.",
        "publisher": {
          "@id": `${url}/#organization`,
        },
        "inLanguage": "id-ID",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TouristAttractionJsonLd({
  id,
  title,
  description,
  imageUrl,
  category,
}: {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  category?: string;
}) {
  const url = `https://www.malakosa.web.id/wisata/${id}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": title,
    "description": description,
    "url": url,
    "image": imageUrl || "https://www.malakosa.web.id/icon.png",
    "touristType": category || "Wisata Alam",
    "publicAccess": true,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Desa Malakosa, Kec. Balinggi",
      "addressRegion": "Sulawesi Tengah",
      "addressCountry": "ID",
    },
    "isAccessibleForFree": true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
