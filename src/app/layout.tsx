import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import SupabaseListener from "./components/supabase-listener";

export const metadata: Metadata = {
  title: "ねこぴーす",
  description: "幸せな、猫生を。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        
        <SupabaseListener />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
