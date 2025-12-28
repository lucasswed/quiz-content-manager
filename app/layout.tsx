import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";

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
        <Navigation />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
