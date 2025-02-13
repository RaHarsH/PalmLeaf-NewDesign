import React from "react";

const FormPreview = ({ formData, onConfirm, onCancel }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-5">Preview Your Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(formData).map(([formKey, formValue]) => (
              Object.entries(formValue).map(([fieldKey, fieldValue], idx) => (
                <tr key={`${formKey}-${idx}`} className="border-b">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{fieldKey}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {typeof fieldValue === "object" && fieldValue !== null
                      ? Object.entries(fieldValue).map(([key, value]) => (
                          <div key={key} className="text-sm text-gray-600">
                            <strong>{key}:</strong> {value || "N/A"}
                          </div>
                        ))
                      : fieldValue || "N/A"}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-5 space-x-4">
        <button onClick={onCancel} className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FormPreview;
