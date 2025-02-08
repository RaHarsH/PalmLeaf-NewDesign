import React, { useEffect, useState } from "react";

const FormTwo = ({ onNext, onPrev, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData);


  useEffect(() => {
    console.log(localFormData)
  }, [])

  return (

    <>
    <h1>Form Two</h1>
    </>
  );
};

export default FormTwo;
