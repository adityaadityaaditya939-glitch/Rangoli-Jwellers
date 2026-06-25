"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneFab from "@/components/PhoneFab";
import ConsultationModal from "@/components/ConsultationModal";
import { ConsultationProvider } from "@/components/ConsultationProvider";

export default function StoreChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideStoreChrome = pathname.startsWith("/admin") || pathname === "/login";

  if (hideStoreChrome) {
    return <>{children}</>;
  }

  return (
    <ConsultationProvider>
      <Header />
      {children}
      <Footer />
      <PhoneFab />
      <ConsultationModal />
    </ConsultationProvider>
  );
}
