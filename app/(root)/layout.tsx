import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../globals.css";
import { Header } from "@/shared/components/shared/header";


export const metadata: Metadata = { //заголовок для SEO, описание тоже
  title: "Next Pizza | Главная",
  description: "Сайт пиццерии Next Pizza",
};

export default function HomeLayout({
  children,
  modal, //по названию слота @modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
