import React from 'react';
import { Link } from 'react-router-dom';
import './AppointmentPage.css';

function AppointmentPage() {
  return (
    <div className="appointment-page">
      <div className="content">
        <div className="quote">
          <p>
            "You find peace not by rearranging the circumstances of your life, but by realizing who you are at the deepest level."
            <br />– Eckhart Tolle
          </p>
        </div>
        <h1>Book an Appointment</h1>
        <Link to="/Appointment-table">
          <button className="appointment-button">Appointment Scheduling</button>
        </Link>
      </div>
    </div>
  );
}

export default AppointmentPage;
