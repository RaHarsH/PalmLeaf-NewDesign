import React, { useEffect, useState } from "react";

const FormFive = ({ onNext, onPrev, onDataChange, formData }) => {
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
      <h2 className="text-2xl font-semibold mb-4">Form Five - Bundle & Access Control</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bundle */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2 mb-2">Bundle Information</h3>
        </div>
        {[
          "bundle_origin",
          "bundle_owner_name",
          "bundle_number",
          "bundle_received_date",
          "sriv_number",
          "bundle_returned_date",
          "number_subwork",
          "length",
          "width",
          "total_leaves",
          "total_images",
          "stitch_or_nonstitch",
          "bundle_source_address",
          "worked_by",
        ].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace(/_/g, " ")}:</label>
            <input
              type={
                field.includes("date") ? "date" : field.includes("bundle_number") || field.includes("sriv_number") ? 'text' : field.includes("number") || field.includes("total") || field.includes("length") || field.includes("width")
                  ? "number"
                  : "text"
              }
              className="w-full border p-2 rounded"
              value={localFormData.bundle?.[field] || ""}
              onChange={(e) => handleChange(e, "bundle", field)}
            />
          </div>
        ))}

        {/* Access Control */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2 mb-2">Access Control</h3>
        </div>
        {["user_id", "grantha_id", "permission_level"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace(/_/g, " ")}:</label>
            <input
              type={field.includes("id") ? "number" : "text"}
              className="w-full border p-2 rounded"
              value={localFormData.accesscontrol?.[field] || ""}
              onChange={(e) => handleChange(e, "accesscontrol", field)}
            />
          </div>
        ))}
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

export default FormFive;
