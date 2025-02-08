import React, { useEffect, useState } from "react";

const FormThree = ({ onNext, onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData);


  useEffect(() => {
    console.log(localFormData)
  }, [])

  return (

    <>
    <h1>Form Three</h1>
    </>
  );
};

export default FormThree;
