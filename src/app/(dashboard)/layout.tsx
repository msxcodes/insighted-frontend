import React from "react";
import Footer from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
