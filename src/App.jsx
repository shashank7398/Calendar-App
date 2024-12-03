import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddCompanyForm from "./components/Admin/AddCompanyForm";
import CompanyList from "./components/Admin/CompanyList";
import Dashboard from "./components/User/Dashboard";
import CalendarView from "./components/User/CalendarView";
import Notifications from "./components/User/Notifications";
import "./App.css"; // Importing the CSS file

function App() {
  // State to store companies and communications
  const [companies, setCompanies] = useState([]);
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [dueTodayCommunications, setDueTodayCommunications] = useState([]);

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
        name: "GreenTech",
        location: "Austin, TX",
        linkedIn: "https://linkedin.com/company/greentech",
        emails: ["support@greentech.com"],
        phoneNumbers: ["+1 456 789 1234"],
        comments: "Collaborating on sustainable energy project.",
        lastCommunications: [
          { type: "LinkedIn Post", date: "2024-11-22" },
          { type: "Phone Call", date: "2024-11-12" },
        ],
        nextCommunication: { type: "Email", date: "2024-12-04" },
      },
      {
        id: 4,
        name: "Infotrix",
        location: "Kanpur, UP",
        linkedIn: "https://linkedin.com/company/infotrix",
        emails: ["support@infotrix.com"],
        phoneNumbers: ["+1 456 789 1235"],
        comments: "Collaborating on sustainable project.",
        lastCommunications: [
          { type: "LinkedIn Post", date: "2024-11-22" },
          { type: "Phone Call", date: "2024-11-12" },
        ],
        nextCommunication: { type: "Email", date: "2024-12-02" },
      },
    ],
    []
  ); // The empty array ensures it's memoized and doesn't trigger unnecessary re-renders

  useEffect(() => {
    setCompanies(companiesMockData);
    updateNotifications(companiesMockData);
  }, [companiesMockData]); // Only re-run if companiesMockData changes

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

  // Handler for adding a new company
  const handleAddCompany = (newCompanyData) => {
    setCompanies([...companies, newCompanyData]);
    updateNotifications([...companies, newCompanyData]);
  };

  // Handler for deleting a company
  const handleDeleteCompany = (companyId) => {
    const updatedCompanies = companies.filter(
      (company) => company.id !== companyId
    );
    setCompanies(updatedCompanies);
    updateNotifications(updatedCompanies);
  };

  // Handler for editing a company
  const handleEditCompany = (editedCompanyData) => {
    const updatedCompanies = companies.map((company) =>
      company.id === editedCompanyData.id ? editedCompanyData : company
    );
    setCompanies(updatedCompanies);
    updateNotifications(updatedCompanies);
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
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard companies={companies} />} />
          <Route
            path="/add-company"
            element={<AddCompanyForm onSubmit={handleAddCompany} />}
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
                events={companies.map((company) => company.lastCommunications)}
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
    </Router>
  );
}

export default App;
