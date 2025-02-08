import React, { useEffect, useState } from "react";

const FormFour = ({ onNext, onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData);


  useEffect(() => {
    console.log(localFormData)
  }, [])

  return (

    <>
    <h1>Form Four</h1>
    </>
  );
};

export default FormFour;
