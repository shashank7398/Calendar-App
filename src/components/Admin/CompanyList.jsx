// components/Admin/CompanyList.jsx
import React from "react";
import "./CompanyList.css"; // Import the CSS for styling

const CompanyList = ({ companies, onEdit, onDelete }) => {
  return (
    <div className="company-list">
      <h2>Company List</h2>
      <div className="company-items">
        {companies.map((company) => (
          <div key={company.id} className="company-item">
            <div className="company-info">
              <h3>{company.name}</h3>
              <p>
                <strong>Location:</strong> {company.location}
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={company.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </a>
              </p>
              <p>
                <strong>Emails:</strong> {company.emails.join(", ")}
              </p>
              <p>
                <strong>Phone:</strong> {company.phoneNumbers.join(", ")}
              </p>
            </div>
            <div className="company-actions">
              <button onClick={() => onEdit(company)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => onDelete(company.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
