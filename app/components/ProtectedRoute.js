import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }
  }, [router]);

  return <>{children}</>;
}
