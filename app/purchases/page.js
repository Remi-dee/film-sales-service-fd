"use client";

import { useEffect, useState } from "react";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId"); // Assume userId is stored in localStorage
    try {
      const response = await fetch(
        `http://localhost:4000/purchases/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Failed to fetch purchases", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading purchases...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Purchases
        </h1>
        {purchases.length === 0 ? (
          <p className="text-gray-600">
            No purchases found. Start buying some amazing films!
          </p>
        ) : (
          <ul className="space-y-4">
            {purchases.map((purchase) => (
              <li
                key={purchase._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {purchase.filmId.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-gray-700">
                  <p>
                    <strong>Price:</strong> ${purchase.price}
                  </p>
                  <p>
                    <strong>Purchased on:</strong>{" "}
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
