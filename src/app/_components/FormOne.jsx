import React, { useEffect, useState } from "react";

const FormOne = ({ onNext, onDataChange, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData);


  useEffect(() => {
    console.log(localFormData)
  }, [])

  return (

    <>
    <h1>Form One</h1>
    </>
  );
};

export default FormOne;
