"use client";

import FormFive from '@/app/_components/FormFive';
import FormFour from '@/app/_components/FormFour';
import FormOne from '@/app/_components/FormOne';
import FormThree from '@/app/_components/FormThree';
import FormTwo from '@/app/_components/FormTwo';
import FormSix from '@/app/_components/FormSix';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormPreview from '@/app/_components/FormPreview';
import Link from 'next/link';

const Page = () => {
  const [step, setStep] = useState(1);

  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    form1: {
      language: { language_id: null, language_name: "" },
      granthatype: { grantha_type_id: null, type_name: "" },
      granthadeck: { grantha_deck_id: null, type_name: "" },
      author: { author_id: null, name: "", birth_year: "", death_year: "", bio: "", scribe_name: "" },
      location: { location_id: null, shelf_number: "", room_number: "" },
    },
    form2: {
      grantha: { grantha_id: null, grantha_name: "", creation_date: null, description: "", grantha_deck_id: null, grantha_type_id: null, author_id: null, location_id: null, remarks: "" }
    },
    form3: {
      granthalanguage: { grantha_id: null, language_id: null },
      storagemechanism: { storage_id: null, grantha_id: null, storage_type: "", backup_location: "", encryption_status: "", storage_location: "", last_backup_date: null, access_url: "", storage_notes: "" },
      physicalcondition: { condition_id: null, grantha_id: null, condition_status: "", condition_notes: "", last_checked_date: null },
      conservationhistory: { conservation_id: null, grantha_id: null, conservation_date: null, description: "", cleaned: "" }
    },
    form4: {
      scanningproperties: { scan_id: null, grantha_id: null, scanner_model: "", resolution_dpi: null, technician_name: "", lighting_conditions: "", color_depth: "", notes: "", file_format: "", page_count: null, scanning_start_date: null, scanning_completed_date: null, grayscale_completed_date: null, horizontal_or_vertical_scan: "", numbered: "" },
      scannedimage: { image_id: null, grantha_id: null, image_url: "", capture_date: null },
      digitalfile: { file_id: null, grantha_id: null, file_name: "", file_path: "", file_format: "", folder_size_in_gb: null, capture_time: null, version_number: "", thumbnail_url: "", scan_id: null },
    },
    form5: {
      bundle: { bundle_id: null, grantha_id: null, bundle_origin: "", bundle_owner_name: "", bundle_number: "", bundle_received_date: null, sriv_number: "", bundle_returned_date: null, number_subwork: null, length: null, width: null, total_leaves: null, total_images: null, stitch_or_nonstitch: "", bundle_source_address: "", worked_by: "" },
      accesscontrol: { user_id: null, grantha_id: null, permission_level: "" },
    },
    form6: {
      subworks: { subworker_id: null, name: "", bundle_id: null }
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleDataChange = (formKey, newData) => {
    setFormData((prevData) => ({
      ...prevData,
      [formKey]: { ...prevData[formKey], ...newData }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("This is the formData: ", formData)

    try {
      const response = await axios.post("/api/insertFormData", formData)

      console.log("Response from the API: ", response.data)

      toast.success("Data inserted successfully !")
      
      if(response.data.status === 200) {
        console.log("Data inserted successfully !")
      }
    } catch (error) {
      toast.error("Error inserting data")
      console.log("Error inserting data, ", error.response.data.error)
    }
  }

  return (
    <div className='w-full h-[90vh] mt-20'>
      <h1 className='text-2xl font-bold text-center'>Data Management</h1>

      {/* link to view data page (temporary) */}
      <Link href={`/admin/dashboard/dataManagement/viewData`}>View Data</Link>

      <div className="w-full h-[90vh] flex flex-col items-center mt-10">

        {/* Step Rendering */}

        {step === 1 && <FormOne onNext={nextStep} onDataChange={(data) => handleDataChange("form1", data)} formData={formData.form1} />}
        {step === 2 && <FormTwo onNext={nextStep} onPrev={prevStep} onDataChange={(data) => handleDataChange("form2", data)} formData={formData.form2} />}
        {step === 3 && <FormThree onNext={nextStep} onPrev={prevStep} onDataChange={(data) => handleDataChange("form3", data)} formData={formData.form3} />}
        {step === 4 && <FormFour onNext={nextStep} onPrev={prevStep} onDataChange={(data) => handleDataChange("form4", data)} formData={formData.form4} />}
        {step === 5 && <FormFive onNext={nextStep} onPrev={prevStep} onDataChange={(data) => handleDataChange("form5", data)} formData={formData.form5} />}
        {step === 6 && <FormSix onPrev={prevStep} onDataChange={(data) => handleDataChange("form6", data)} formData={formData.form6} />}
        
        { showPreview &&
          <FormPreview formData={formData} onConfirm={handleSubmit} onCancel={() => setShowPreview(false)}/>
          
        }

        {/* Navigation Buttons */}


        <div className="mt-5 flex gap-5">
          {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-500 text-white rounded">Prev</button>}
          {step < 6 && <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>}
          {step === 6 && <button onClick={() => setShowPreview(true)} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default Page;
