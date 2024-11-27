import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token
    router.push("/login"); // Redirect to login
  };

  return (
    <nav className="bg-indigo-600 p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold">Film Sales Dashboard</h1>
      <div className="flex space-x-3 items-center">
        <a href="/purchases" className="text-blue-100 hover:underline">
          View Purchases
        </a>
        <a href="/profile" className="text-blue-100 hover:underline">
          Profile
        </a>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>{" "}
      </div>
    </nav>
  );
}
