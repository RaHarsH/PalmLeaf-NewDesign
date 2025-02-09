import React, { useEffect, useState } from "react";

const FormSix = ({ onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData || {});

  useEffect(() => {
    setLocalFormData(formData || {});
  }, [formData]);

  const handleChange = (e, table, field) => {
    const { value } = e.target;
    const updatedData = {
      ...localFormData,
      [table]: { ...localFormData[table], [field]: value },
    };

    onDataChange(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Form Six - Subworks</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subworks Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2 mb-2">Subworks Information</h3>
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.subworks?.name || ""}
            onChange={(e) => handleChange(e, "subworks", "name")}
          />
        </div>

        {/* Bundle ID */}
        <div>
          <label className="block font-medium">Bundle ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.subworks?.bundle_id || ""}
            onChange={(e) => handleChange(e, "subworks", "bundle_id")}
          />
        </div>
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-start mt-6">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={onPrev}
        >
          Previous
        </button>
      </div>
    </div>
  );
};

export default FormSix;
