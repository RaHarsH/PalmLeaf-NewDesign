import React, { useEffect, useState } from "react";

const FormOne = ({ onNext, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData || {}); // This is done to ensure local state is in sync with parent data
  }, [formData]);

  const handleChange = (e, category, field) => {
    const { value } = e.target;
    setLocalFormData((prev) => {
      const updatedData = {
        ...prev,
        [category]: { ...prev[category], [field]: value },
      };
      
      // const newFormData = { ...formData, form1: updatedData };

      onDataChange(updatedData); // Update the parent state
      return updatedData;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Form One</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language */}
        <div>
          <label className="block font-medium">Language ID</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={localFormData.language.language_id}
            onChange={(e) => handleChange(e, "language", "language_id")}
          />
        </div> 
        <div>
          <label className="block font-medium">Language Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={localFormData.language.language_name}
            onChange={(e) => handleChange(e, "language", "language_name")}
          />
        </div>

        {/* Grantha Type */}
        <div>
          <label className="block font-medium">Grantha Type ID</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={localFormData.granthatype.grantha_type_id}
            onChange={(e) => handleChange(e, "granthatype", "grantha_type_id")}
          />
        </div>  

        <div>
          <label className="block font-medium">Grantha Type Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={localFormData.granthatype.type_name}
            onChange={(e) => handleChange(e, "granthatype", "type_name")}
          />
        </div>

        {/* Grantha Deck */}
        <div>
          <label className="block font-medium">Grantha Deck ID</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={localFormData.granthadeck.grantha_deck_id}
            onChange={(e) => handleChange(e, "granthadeck", "grantha_deck_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Grantha Deck Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={localFormData.granthadeck.type_name}
            onChange={(e) => handleChange(e, "granthadeck", "type_name")}
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block font-medium">Author ID</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={localFormData.author.author_id}
            onChange={(e) => handleChange(e, "author", "author_id")}
          />
        </div>
        <div>
          <label className="block font-medium">Author Name</label> 
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={localFormData.author.name}
            onChange={(e) => handleChange(e, "author", "name")}
          />
        </div>

        {/* Birth Year */}
        <div>
          <label className="block font-medium">Birth Year</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={localFormData.author.birth_year || ""}
            onChange={(e) => handleChange(e, "author", "birth_year")}
          />
        </div>

        {/* Death Year */}
        <div>
          <label className="block font-medium">Death Year</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={localFormData.author.death_year || ""}
            onChange={(e) => handleChange(e, "author", "death_year")}
          />
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="block font-medium">Bio</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            value={localFormData.author.bio}
            onChange={(e) => handleChange(e, "author", "bio")}
          />
        </div>

        {/* Scribe Name */}
        <div>
          <label className="block font-medium">Scribe Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={localFormData.author.scribe_name}
            onChange={(e) => handleChange(e, "author", "scribe_name")}
          />
        </div>

        {/* Shelf Number */}
        <div>
          <label className="block font-medium">Shelf Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={localFormData.location.shelf_number}
            onChange={(e) => handleChange(e, "location", "shelf_number")}
          />
        </div>

        {/* Room Number */}
        <div>
          <label className="block font-medium">Room Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={localFormData.location.room_number}
            onChange={(e) => handleChange(e, "location", "room_number")}
          />
        </div>
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormOne;
