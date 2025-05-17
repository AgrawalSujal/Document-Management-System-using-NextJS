import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/app/components/Navbar";

const AddDocument = () => {
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const handleDocumentNameChange = (e) => {
    setDocumentName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddDocument = () => {
    // if (!documentName.trim() || !description.trim() || !image) {
    //   toast.error("Please fill in all fields!!");
    //   return;
    // }
    const currentDate = new Date().toLocaleDateString();
    const existingDocuments =
      JSON.parse(localStorage.getItem("documents")) || [];
    const newDocument = {
      id: existingDocuments.length + 1,
      name: documentName,
      description: description,
      image: image,
      date: currentDate,
    };
    const updatedDocuments = [...existingDocuments, newDocument];
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    setDocumentName("");
    setDescription("");
    setImage("");
    toast.success("Document Added Successfully");
  };
  return (
    <>
      <Navbar />
      <div className="mb-3 mt-5 container" style={{ width: "70%" }}>
        <h2 className="mb-4">Add Your Document</h2>
        <label htmlFor="documentName" className="form-label">
          Document Name
        </label>
        <input
          type="text"
          className="form-control"
          id="documentName"
          value={documentName}
          onChange={handleDocumentNameChange}
        />{" "}
        <label htmlFor="description" className="form-label mt-3">
          Description
        </label>{" "}
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="image" className="form-label mt-3">
          Select Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={handleImageChange}
        />
        <button className="btn btn-primary mt-3" onClick={handleAddDocument}>
          Add Document
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddDocument;
