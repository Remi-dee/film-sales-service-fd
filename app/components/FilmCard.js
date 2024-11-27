import Image from "next/image";
import { Avengers } from "../../public/asset/captain-comedy.jpg";
import { JusticeLeague } from "../../public/asset/justice-league.jpg";
import { Person } from "../../public/asset/person-unsplash.jpg";
export function FilmCard({ film, onDelete, onEdit }) {
  const role = localStorage.getItem("userRole");
  const placeholderImages = [
    "/asset/captain-comedy.jpg",
    "/asset/justice-league.jpg",
    "/asset/person-unsplash.jpg",
  ];

  // Assign a random image from the placeholder list
  const imageUrl = placeholderImages[film._id % placeholderImages.length];

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:4000/films/${film._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        onDelete(); // Refresh the film list
      } else {
        console.error("Failed to delete film");
      }
    } catch (error) {
      console.error("Error deleting film", error);
    }
  };

  const handlePurchase = async (film) => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:4000/purchases/${film._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ customerId: userId, price: film.price }), // Use the logged-in user's ID
        }
      );
      if (response.ok) {
        alert(`You purchased ${film.title} for $${film.price}!`);
      } else {
        console.error("Failed to purchase film");
      }
    } catch (error) {
      console.error("Error purchasing film", error);
    }
  };

  return (
    <li className="p-4 border rounded shadow hover:bg-gray-100">
      <div className="flex justify-between">
        <div>
          <Image
            src={imageUrl}
            alt={film.title}
            width={300}
            height={150}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h3 className="text-xl font-bold">{film.title}</h3>
          <p className="text-gray-700">{film.description}</p>
          <p className="text-sm text-gray-600">Genre: {film.genre}</p>
          <p className="text-sm text-gray-600">Price: ${film.price}</p>
          <p className="text-sm text-gray-600">
            Release Date: {new Date(film.releaseDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <button
            onClick={() => handlePurchase(film)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Purchase
          </button>
          {role === "admin" && (
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
