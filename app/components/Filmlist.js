import { useState, useEffect } from "react";
import { EditFilmModal } from "./EditFilmModal";
import { FilmCard } from "./FilmCard";

export default function FilmList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFilm, setNewFilm] = useState({
    title: "",
    description: "",
    genre: "",
    price: "",
    releaseDate: "",
  });
  const [editingFilm, setEditingFilm] = useState(null);

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      setUserRole(role);
    }
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    setLoading(true);
    let token = null;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("authToken");
    }
    try {
      const response = await fetch(
        "https://film-sales-service-bd.onrender.com/films",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setFilms(data);
    } catch (error) {
      console.error("Failed to fetch films", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFilm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://film-sales-service-bd.onrender.com/films",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newFilm),
        }
      );
      if (response.ok) {
        setNewFilm({
          title: "",
          description: "",
          genre: "",
          price: "",
          releaseDate: "",
        });
        fetchFilms(); // Refresh the film list
      } else {
        console.error("Failed to create film");
      }
    } catch (error) {
      console.error("Error creating film", error);
    }
  };

  const handleUpdateFilm = async (updatedFilm) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `https://film-sales-service-bd.onrender.com/films/${updatedFilm._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFilm),
        }
      );
      if (response.ok) {
        setEditingFilm(null); // Close the modal
        fetchFilms(); // Refresh the film list
      } else {
        console.error("Failed to update film");
      }
    } catch (error) {
      console.error("Error updating film", error);
    }
  };

  if (loading) return <p>Loading films...</p>;

  return (
    <div className="mt-4">
      {userRole === "admin" ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Admin Film Dasboard</h2>
          <h2 className="text-xl font-bold mb-4">Create Film</h2>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Film sales, please explore varieties of movies of your
            choice
          </h2>
        </div>
      )}{" "}
      {/* Create Film Form */}
      {userRole === "admin" && (
        <form onSubmit={handleCreateFilm} className="mb-6">
          <input
            type="text"
            placeholder="Title"
            value={newFilm.title}
            onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <textarea
            placeholder="Description"
            value={newFilm.description}
            onChange={(e) =>
              setNewFilm({ ...newFilm, description: e.target.value })
            }
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={newFilm.genre}
            onChange={(e) => setNewFilm({ ...newFilm, genre: e.target.value })}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newFilm.price}
            onChange={(e) => setNewFilm({ ...newFilm, price: e.target.value })}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="date"
            placeholder="Release Date"
            value={newFilm.releaseDate}
            onChange={(e) =>
              setNewFilm({ ...newFilm, releaseDate: e.target.value })
            }
            className="border p-2 rounded w-full mb-2"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Film
          </button>
        </form>
      )}
      {/* Film List */}
      <ul className="space-y-2">
        {films.map((film) => (
          <FilmCard
            key={film._id}
            film={film}
            onEdit={() => setEditingFilm(film)}
            onDelete={fetchFilms}
          />
        ))}

        {/* Edit Modal */}
        {editingFilm && (
          <EditFilmModal
            film={editingFilm}
            onClose={() => setEditingFilm(null)}
            onSave={handleUpdateFilm}
          />
        )}
      </ul>
    </div>
  );
}
