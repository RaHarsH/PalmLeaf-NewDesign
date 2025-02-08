import React, { useEffect, useState } from "react";

const FormSix = ({ onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData);


  useEffect(() => {
    console.log(localFormData)
  }, [])

  return (

    <>
    <h1>Form Six</h1>
    </>
  );
};

export default FormSix;
