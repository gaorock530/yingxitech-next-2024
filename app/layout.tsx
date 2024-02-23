import type { Metadata } from "next";
import './setup.css'

export const metadata: Metadata = {
  title: "影袭网络|YingxiTech",
  description: "yingxitech, 影袭网络, 影袭科技, 影袭, 科技, AI, tech, Communication, shadowstrike",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
