"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (accessToken && user) {
        router.push("/upload");
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}
