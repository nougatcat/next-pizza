import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../globals.css";
import { Header } from "@/shared/components/shared/header";
import { Suspense } from "react";


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
      <Suspense>
        <Header />
        {/* //? Suspense нужен чтобы компонент Header с useSearchParams не вызывал ошибок при загрузке страницы. в саспенс можно прописать фоллбек для прелоадера */}
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
