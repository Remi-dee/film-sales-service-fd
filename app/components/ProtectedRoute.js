import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-only
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }
  }, [isClient, router]);

  // Render nothing until client-side rendering is confirmed
  if (!isClient) return null;

  return <>{children}</>;
}
