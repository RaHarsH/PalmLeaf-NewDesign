import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const FormFour = ({ onNext, onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData || {});
  const fileInputRef = useRef(null); // Ref for file input reset

  useEffect(() => {
    setLocalFormData(formData || {});
    console.log('====================================');
    console.log(formData);
    console.log('====================================');
  }, [formData]);

  const handleChange = async (e, table, field) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
  
        try {
          const response = await axios.post("/api/uploadImage", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
  
          if (response.data.systemPath) {
            const updatedData = {
              ...localFormData,
              [table]: {
                ...localFormData[table],
                [field]: response.data.systemPath, // Set field value to systemPath
                image_url: response.data.systemPath, // Ensure image_url is also updated
              },
            };
  
            setLocalFormData(updatedData);
            onDataChange(updatedData);
  
            // Reset file input
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        } catch (error) {
          console.error("File upload failed:", error);
        }
      }
    } else {
      const { value } = e.target;
      const updatedData = {
        ...localFormData,
        [table]: { ...localFormData[table], [field]: value },
      };
  
      setLocalFormData(updatedData);
      onDataChange(updatedData);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Form Four - Scanning & Digital Files</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scanning Properties */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2 mb-2">Scanning Properties</h3>
        </div>
        {["scanner_model", "resolution_dpi", "technician_name", "lighting_conditions", "color_depth", "notes", "file_format", "page_count", "scanning_start_date", "scanning_completed_date", "grayscale_completed_date", "horizontal_or_vertical_scan", "numbered"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace(/_/g, " ")}:</label>
            <input
              type={field.includes("date") ? "date" : field.includes("count") ? "number" : "text"}
              className="w-full border p-2 rounded"
              value={localFormData.scanningproperties?.[field] || ""}
              onChange={(e) => handleChange(e, "scanningproperties", field)}
            />
          </div>
        ))}

        {/* Scanned Image */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2 mb-2">Scanned Image</h3>
        </div>
        {["image_url", "capture_date"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.includes("image") ? "Upload Image" : field.replace(/_/g, " ")}:</label>
            <input
              type={field.includes("date") ? "date" : "file"}
              className="w-full border p-2 rounded"
              ref={field === "image_url" ? fileInputRef : null} // Attach ref only to file input
              onChange={(e) => handleChange(e, "scannedimage", field)}
            />
          </div>
        ))}

        {/* Digital File */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2 mb-2">Digital File</h3>
        </div>
        {["file_name", "file_path", "file_format", "folder_size_in_gb", "capture_time", "version_number", "thumbnail_url", "scan_id"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace(/_/g, " ")}:</label>
            <input
              type={field.includes("time") ? "time" : field.includes("gb") ? "number" : "text"}
              className="w-full border p-2 rounded"
              value={localFormData.digitalfile?.[field] || ""}
              onChange={(e) => handleChange(e, "digitalfile", field)}
            />
          </div>
        ))}
      </form>

      <div className="flex justify-between mt-6">
        <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={onPrev}>Previous</button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default FormFour;
