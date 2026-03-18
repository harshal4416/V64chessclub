import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "V64chessclub | Premium Chess Club",
  description: "Join our exclusive chess club. Learn from certified grandmasters, participate in tournaments, and master the royal game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1, marginTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
