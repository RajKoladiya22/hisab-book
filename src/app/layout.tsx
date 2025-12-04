import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hisab Book - Track Your Finances",
  description: "A modern application for tracking income and expenses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background text-text selection:bg-primary selection:text-background`}
      >
        <div className="relative min-h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-repeat bg-center"
            style={{ backgroundImage: "url('/noise.svg')", opacity: 0.05 }}
          ></div>
          <main className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
