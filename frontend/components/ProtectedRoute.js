"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const r = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) r.push("/");
  }, []);

  return <>{children}</>;
}
