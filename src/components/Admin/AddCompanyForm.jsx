import React, { useState } from "react";
import "./AddCompanyForm.css"; // Importing the CSS file for styling

const AddCompanyForm = ({ onSubmit }) => {
  const [companyData, setCompanyData] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    nextCommunicationType: "",
    nextCommunicationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(companyData); // Pass data back to parent component
    setCompanyData({
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      nextCommunicationType: "",
      nextCommunicationDate: "",
    });
  };

  return (
    <div className="add-company-form">
      <h2>Add New Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={companyData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input
            type="url"
            name="linkedIn"
            value={companyData.linkedIn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Emails</label>
          <input
            type="email"
            name="emails"
            value={companyData.emails}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Numbers</label>
          <input
            type="tel"
            name="phoneNumbers"
            value={companyData.phoneNumbers}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Comments</label>
          <textarea
            name="comments"
            value={companyData.comments}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Next Communication Type</label>
          <input
            type="text"
            name="nextCommunicationType"
            value={companyData.nextCommunicationType}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Next Communication Date</label>
          <input
            type="date"
            name="nextCommunicationDate"
            value={companyData.nextCommunicationDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Company
        </button>
      </form>
    </div>
  );
};

export default AddCompanyForm;
