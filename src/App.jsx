import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AddCompanyForm from "./components/Admin/AddCompanyForm";
import CompanyList from "./components/Admin/CompanyList";
import Dashboard from "./components/User/Dashboard";
import CalendarView from "./components/User/CalendarView";
import Notifications from "./components/User/Notifications";
import "./App.css"; // Importing the CSS file

function App() {
  const navigate = useNavigate(); // Hook for navigation

  // State to store companies and communications
  const [companies, setCompanies] = useState([]);
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [dueTodayCommunications, setDueTodayCommunications] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null); // New state for editing

  // Memoizing companiesMockData to avoid re-creation during renders
  const companiesMockData = useMemo(
    () => [
      {
        id: 1,
        name: "Tech Innovators",
        location: "San Francisco, CA",
        linkedIn: "https://linkedin.com/company/tech-innovators",
        emails: ["contact@techinnovators.com"],
        phoneNumbers: ["+1 123 456 7890"],
        comments: "Potential client for SaaS product.",
        lastCommunications: [
          { type: "Email", date: "2024-11-20" },
          { type: "Phone Call", date: "2024-11-15" },
        ],
        nextCommunication: { type: "LinkedIn Post", date: "2024-12-02" },
      },
      {
        id: 2,
        name: "Future Corp",
        location: "New York, NY",
        linkedIn: "https://linkedin.com/company/future-corp",
        emails: ["info@futurecorp.com"],
        phoneNumbers: ["+1 987 654 3210"],
        comments: "Interested in AI solutions.",
        lastCommunications: [
          { type: "LinkedIn Message", date: "2024-11-18" },
          { type: "Email", date: "2024-11-10" },
        ],
        nextCommunication: { type: "Phone Call", date: "2024-12-03" },
      },
      {
        id: 3,
        name: "Dyson",
        location: "New jersy, NY",
        linkedIn: "https://linkedin.com/company/dyson",
        emails: ["info@dyson.com"],
        phoneNumbers: ["+1 987 654 3213"],
        comments: "Interested in Web solutions.",
        lastCommunications: [
          { type: "LinkedIn Message", date: "2024-11-28" },
          { type: "Email", date: "2024-11-13" },
        ],
        nextCommunication: { type: "Email", date: "2024-12-05" },
      },
      {
        id: 4,
        name: "Blackstone",
        location: "Sonipat, HY",
        linkedIn: "https://linkedin.com/company/Blackstone",
        emails: ["info@Black.com"],
        phoneNumbers: ["+1 987 654 3211"],
        comments: "Interested in ML solutions.",
        lastCommunications: [
          { type: "LinkedIn Message", date: "2024-11-08" },
          { type: "Email", date: "2024-11-20" },
        ],
        nextCommunication: { type: "Phone Call", date: "2024-12-08" },
      },
    ],
    []
  );

  useEffect(() => {
    setCompanies(companiesMockData);
    updateNotifications(companiesMockData);
  }, [companiesMockData]);

  const updateNotifications = (companiesList) => {
    const overdue = companiesList.filter(
      (company) => new Date(company.nextCommunication.date) < new Date()
    );
    const dueToday = companiesList.filter(
      (company) =>
        new Date(company.nextCommunication.date).toDateString() ===
        new Date().toDateString()
    );
    setOverdueCommunications(overdue);
    setDueTodayCommunications(dueToday);
  };

  const handleAddCompany = (newCompany) => {
    if (editingCompany) {
      // Update existing company
      const updatedCompanies = companies.map((company) =>
        company.id === editingCompany.id ? newCompany : company
      );
      setCompanies(updatedCompanies);
      setEditingCompany(null); // Reset editing state
      navigate("/company-list"); // Redirect after edit
    } else {
      // Add new company
      const updatedCompanies = [
        ...companies,
        { ...newCompany, id: Date.now() },
      ];
      setCompanies(updatedCompanies);
      navigate("/company-list"); // Redirect after add
    }
    updateNotifications(companies);
  };

  const handleDeleteCompany = (companyId) => {
    const updatedCompanies = companies.filter(
      (company) => company.id !== companyId
    );
    setCompanies(updatedCompanies);
    updateNotifications(updatedCompanies);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company); // Set the company to edit
    navigate("/add-company"); // Redirect to the form
  };

  const Navbar = () => (
    <nav>
      <div className="flex">
        <div className="logo">CommTrack</div>
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/add-company">Add Company</Link>
          <Link to="/company-list">Company List</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/notifications">Notifications</Link>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="containe">
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Dashboard companies={companies} />} />
        <Route
          path="/add-company"
          element={
            <AddCompanyForm
              onSubmit={handleAddCompany}
              editingCompany={editingCompany}
            />
          }
        />
        <Route
          path="/company-list"
          element={
            <CompanyList
              companies={companies}
              onDelete={handleDeleteCompany}
              onEdit={handleEditCompany}
            />
          }
        />
        <Route
          path="/calendar"
          element={
            <CalendarView
              events={companies.map((company) => ({
                title: `${company.name} (${company.nextCommunication.type})`,
                date: company.nextCommunication.date,
              }))}
            />
          }
        />
        <Route
          path="/notifications"
          element={
            <Notifications
              overdue={overdueCommunications}
              dueToday={dueTodayCommunications}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
