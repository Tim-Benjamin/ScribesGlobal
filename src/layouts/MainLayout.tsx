import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/layout/PageTransition";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className="app">
      <Navbar />

      <main>
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}