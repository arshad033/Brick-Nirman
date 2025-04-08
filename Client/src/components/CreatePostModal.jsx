import { useState, useRef } from "react";

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantityAvailable: "",
    size: "",
    grade: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(); // 🔹 for resetting file input

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    onSubmit(data); // send to parent
    resetForm(); // clear all inputs
    onClose(); // close modal
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      quantityAvailable: "",
      size: "",
      grade: "",
      image: null,
    });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // clear file input
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-black bg-[#1d1b1b78] bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Brick Name"
            value={formData.name}
            required
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            required
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantityAvailable"
            placeholder="Quantity Available"
            value={formData.quantityAvailable}
            required
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="size"
            placeholder="Size (e.g., 9x4x3 inches)"
            value={formData.size}
            required
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          <select
            name="grade"
            value={formData.grade}
            required
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          >
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            required
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-32 object-cover rounded border"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
