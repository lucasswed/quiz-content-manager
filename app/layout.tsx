import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quiz Content Manager",
  description: "Manage quiz questions with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
