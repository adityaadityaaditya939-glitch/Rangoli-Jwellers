"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneFab from "@/components/PhoneFab";
import ConsultationModal from "@/components/ConsultationModal";
import { ConsultationProvider } from "@/components/ConsultationProvider";

interface StoreChromeProps {
  children: React.ReactNode;
}

export default function StoreChrome({ children }: StoreChromeProps) {
  const pathname = usePathname();

  const hideStoreChrome =
    pathname.startsWith("/admin") || pathname === "/login";

  if (hideStoreChrome) {
    return <>{children}</>;
  }

  return (
    <ConsultationProvider>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
        <PhoneFab />
        <ConsultationModal />
      </div>
    </ConsultationProvider>
  );
}