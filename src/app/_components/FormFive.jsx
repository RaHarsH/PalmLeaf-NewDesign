import React, { useEffect, useState } from "react";

const FormFive = ({ onNext,onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData);


  useEffect(() => {
    console.log(localFormData)
  }, [])

  return (

    <>
    <h1>Form Five</h1>
    </>
  );
};

export default FormFive;
