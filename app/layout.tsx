import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

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
    <html lang="ru">
      <body className={nunito.className}>
        <main className="min-h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
