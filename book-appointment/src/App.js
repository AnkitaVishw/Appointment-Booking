import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import AppointmentPage from './components/AppointmentPage';
import AppointmentTable from './components/AppointmentTable';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Appointment Booking</h1>
        <Routes>
          <Route path="/" element={<AppointmentPage />} />
          <Route path="/appointment-table" element={<AppointmentTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
