import React, { useEffect, useState } from "react";

const FormThree = ({ onNext, onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData || {});

  useEffect(() => {
    setLocalFormData(formData || {});
  }, [formData]);

  const handleChange = (e, table, field) => {
    let { value } = e.target;

    // Convert to number if field is grantha_id or language_id
    if (["grantha_id", "language_id"].includes(field)) {
      value = value ? Number(value) : null;
    }

    const updatedData = {
      ...localFormData,
      [table]: {
        ...localFormData[table],
        [field]: value,
      },
    };

    onDataChange(updatedData);
    setLocalFormData(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Form Three</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Grantha Language Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Grantha Language</h3>
        </div>

        <div>
          <label className="block font-medium">Grantha ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.granthalanguage?.grantha_id || ""}
            onChange={(e) => handleChange(e, "granthalanguage", "grantha_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Language ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.granthalanguage?.language_id || ""}
            onChange={(e) => handleChange(e, "granthalanguage", "language_id")}
          />
        </div>

        {/* Storage Mechanism Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mt-4 mb-2">Storage Mechanism</h3>
        </div>

        <div>
          <label className="block font-medium">Storage ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.storage_id || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "storage_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Grantha ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.grantha_id || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "grantha_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Storage Type:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.storage_type || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "storage_type")}
          />
        </div>

        <div>
          <label className="block font-medium">Backup Location:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.backup_location || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "backup_location")}
          />
        </div>

        <div>
          <label className="block font-medium">Encryption Status:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.encryption_status || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "encryption_status")}
          />
        </div>

        <div>
          <label className="block font-medium">Storage Location:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.storage_location || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "storage_location")}
          />
        </div>

        <div>
          <label className="block font-medium">Last Backup Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.last_backup_date || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "last_backup_date")}
          />
        </div>

        <div>
          <label className="block font-medium">Access URL:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.access_url || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "access_url")}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Storage Notes:</label>
          <textarea
            className="w-full border p-2 rounded"
            value={localFormData.storagemechanism?.storage_notes || ""}
            onChange={(e) => handleChange(e, "storagemechanism", "storage_notes")}
          />
        </div>

        {/* Physical Condition Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mt-4 mb-2">Physical Condition</h3>
        </div>

        <div>
          <label className="block font-medium">Condition ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.physicalcondition?.condition_id || ""}
            onChange={(e) => handleChange(e, "physicalcondition", "condition_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Grantha ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.physicalcondition?.grantha_id || ""}
            onChange={(e) => handleChange(e, "physicalcondition", "grantha_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Condition Status:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.physicalcondition?.condition_status || ""}
            onChange={(e) => handleChange(e, "physicalcondition", "condition_status")}
          />
        </div>

        <div>
          <label className="block font-medium">Condition Notes:</label>
          <textarea
            className="w-full border p-2 rounded"
            value={localFormData.physicalcondition?.condition_notes || ""}
            onChange={(e) => handleChange(e, "physicalcondition", "condition_notes")}
          />
        </div>

        <div>
          <label className="block font-medium">Last Checked Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={localFormData.physicalcondition?.last_checked_date || ""}
            onChange={(e) => handleChange(e, "physicalcondition", "last_checked_date")}
          />
        </div>

        {/* Conservation History Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mt-4 mb-2">Conservation History</h3>
        </div>

        <div>
          <label className="block font-medium">Conservation ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.conservationhistory?.conservation_id || ""}
            onChange={(e) => handleChange(e, "conservationhistory", "conservation_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Grantha ID:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={localFormData.conservationhistory?.grantha_id || ""}
            onChange={(e) => handleChange(e, "conservationhistory", "grantha_id")}
          />
        </div>

        <div>
          <label className="block font-medium">Conservation Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={localFormData.conservationhistory?.conservation_date || ""}
            onChange={(e) => handleChange(e, "conservationhistory", "conservation_date")}
          />
        </div>

        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            className="w-full border p-2 rounded"
            value={localFormData.conservationhistory?.description || ""}
            onChange={(e) => handleChange(e, "conservationhistory", "description")}
          />
        </div>

        <div>
          <label className="block font-medium">Cleaned:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={localFormData.conservationhistory?.cleaned || ""}
            onChange={(e) => handleChange(e, "conservationhistory", "cleaned")}
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

export default FormThree;
