import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../globals.css";
import { Header } from "@/components/shared/header";


export const metadata: Metadata = { //заголовок для SEO, описание тоже
  title: "Next Pizza | Главная",
  description: "Сайт пиццерии Next Pizza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
