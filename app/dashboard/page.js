"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import FilmList from "../components/Filmlist";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <FilmList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
