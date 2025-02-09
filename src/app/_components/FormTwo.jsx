import React, { useEffect, useState } from "react";

const FormTwo = ({ onNext, onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData || { grantha: {} });

  useEffect(() => {
    setLocalFormData(formData || { grantha: {} }); // Ensure data persists across forms
  }, [formData]);

  const handleChange = (e, field) => {
    let { value } = e.target;
    
    // Convert to number if the field is an ID
    if (["grantha_deck_id", "grantha_type_id", "author_id", "location_id"].includes(field)) {
      value = value ? Number(value) : null;
    }

    const updatedData = {
      ...localFormData,
      grantha: { 
        ...localFormData.grantha, 
        [field]: value 
      },
    };

    onDataChange(updatedData); // Persist to parent state
    setLocalFormData(updatedData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Form Two</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Grantha Name */}
        <div>
          <label className="block font-medium">Grantha Name:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.grantha_name || ""}
            onChange={(e) => handleChange(e, "grantha_name")}
          />
        </div>

        {/* Creation Date */}
        <div>
          <label className="block font-medium">Creation Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.creation_date || ""}
            onChange={(e) => handleChange(e, "creation_date")}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-medium">Description:</label>
          <textarea
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.description || ""}
            onChange={(e) => handleChange(e, "description")}
          />
        </div>

        {/* Grantha Deck ID (Number) */}
        <div>
          <label className="block font-medium">Grantha Deck ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.grantha_deck_id || ""}
            onChange={(e) => handleChange(e, "grantha_deck_id")}
          />
        </div>

        {/* Grantha Type ID (Number) */}
        <div>
          <label className="block font-medium">Grantha Type ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.grantha_type_id || ""}
            onChange={(e) => handleChange(e, "grantha_type_id")}
          />
        </div>

        {/* Author ID (Number) */}
        <div>
          <label className="block font-medium">Author ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.author_id || ""}
            onChange={(e) => handleChange(e, "author_id")}
          />
        </div>

        {/* Location ID (Number) */}
        <div>
          <label className="block font-medium">Location ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.location_id || ""}
            onChange={(e) => handleChange(e, "location_id")}
          />
        </div>

        {/* Remarks */}
        <div className="md:col-span-2">
          <label className="block font-medium">Remarks:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.grantha?.remarks || ""}
            onChange={(e) => handleChange(e, "remarks")}
          />
        </div>
        
      </form>

      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={onPrev}
        >
          Previous
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormTwo;
