import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Root layout for the app directory.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ankit Gupta | Senior Backend Engineer",
  description:
    "Portfolio of Ankit Gupta, Senior Backend Engineer focused on distributed systems, scalable backend architecture, and high-throughput data platforms.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ankit Gupta",
  jobTitle: "Senior Backend Engineer",
  url: "https://ankit.dev",
  sameAs: [
    "https://github.com/ankitguptaoct21",
    "https://www.linkedin.com/in/ankit-gupta-oct21/",
  ],
};

const softwareSourceCodeSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Ankit Gupta Portfolio",
  codeRepository: "https://github.com/ankitguptaoct21/my-portfolio",
  programmingLanguage: ["TypeScript", "JavaScript"],
  runtimePlatform: "Node.js",
  creator: {
    "@type": "Person",
    name: "Ankit Gupta",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSourceCodeSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
