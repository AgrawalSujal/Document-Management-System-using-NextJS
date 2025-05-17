"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(storedDocuments);
  }, []);

  const handleViewDocument = (id) => {
    const document = documents.find((doc) => doc.id === id);
    setSelectedDocument(document);
    setShowModal(true);
  };

  const handleDeleteDocument = (id) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };

  const filteredDocuments = documents.filter((document) =>
    document.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Document List</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredDocuments.length === 0 ? (
          <p className="text-muted">No documents found.</p>
        ) : (
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => (
                <tr key={document.id}>
                  <td>{document.id}</td>
                  <td>{document.name}</td>
                  <td>{document.date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleViewDocument(document.id)}>
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteDocument(document.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedDocument && (
        <div
          className="modal show fade"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedDocument.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>{selectedDocument.description}</p>
                {selectedDocument.image && (
                  <img
                    src={selectedDocument.image}
                    alt="Document"
                    className="img-fluid rounded"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Documents;
