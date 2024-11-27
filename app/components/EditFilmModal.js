import { useState } from "react";

export function EditFilmModal({ film, onClose, onSave }) {
  const [updatedFilm, setUpdatedFilm] = useState({ ...film });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFilm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedFilm);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Film</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={updatedFilm.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <textarea
            name="description"
            value={updatedFilm.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="text"
            name="genre"
            value={updatedFilm.genre}
            onChange={handleChange}
            placeholder="Genre"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="number"
            name="price"
            value={updatedFilm.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="date"
            name="releaseDate"
            value={updatedFilm.releaseDate}
            onChange={handleChange}
            placeholder="Release Date"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
