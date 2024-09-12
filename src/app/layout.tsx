import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meal Explorer",
  description: "Explore meals from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <header className="bg-slate-600 text-white">
          <nav className="container mx-auto flex items-center justify-between p-4">
            <a className="text-2xl font-bold" href="../">Meal Explorer</a>
            <ul className="flex space-x-4">
              <li><a className="hover:text-gray-300" href="../">Home</a></li>
              <li><a className="hover:text-gray-300" href="../mealList">Meal List</a></li>
              <li><a className="hover:text-gray-300" href="../aboutUs">About Us</a></li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-slate-600 text-white text-center py-4">
          © 2024 Meal Explorer. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
