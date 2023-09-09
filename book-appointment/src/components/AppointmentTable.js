import React, { useState } from 'react';
import './AppointmentTable.css';

function isSlotBooked(bookedSlots, day, timeSlot) {
  return bookedSlots.includes(`${day}'s ${timeSlot}`);
}

function AppointmentTable() {
  const demoBookedSlots = ["Sunday's 10am-12pm", "Monday's 1pm-4pm"];
  const [bookedSlots, setBookedSlots] = useState(demoBookedSlots);

  const [bookingDetails, setBookingDetails] = useState({
    day: '',
    timeSlot: '',
    name: '',
    age: '',
    phoneNumber: '',
  });

  function handleTimeSlotClick(day, timeSlot) {
    const slotKey = `${day}'s ${timeSlot}`;

    if (isSlotBooked(bookedSlots, day, timeSlot)) {
      alert(`The ${slotKey} slot is already booked.`);
    } else {
      setBookingDetails({
        day,
        timeSlot,
        name: '',
        age: '',
        phoneNumber: '',
      });
    }
  }

  function handleBookSlot() {
    if (!bookingDetails.name || !bookingDetails.age || !bookingDetails.phoneNumber) {
      alert('Please fill out all fields.');
      return;
    }
  
    fetch('http://localhost:3001/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        alert(`Slot successfully booked for ${data.day}'s ${data.timeSlot}.`);
        setBookingDetails({
          day: '',
          timeSlot: '',
          name: '',
          age: '',
          phoneNumber: '',
        });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  

  function renderBookingForm() {
    return (
      <div className="booking-form">
        <input
          type="text"
          placeholder="Name"
          value={bookingDetails.name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={bookingDetails.age}
          onChange={(e) => setBookingDetails({ ...bookingDetails, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={bookingDetails.phoneNumber}
          onChange={(e) => setBookingDetails({ ...bookingDetails, phoneNumber: e.target.value })}
        />
        <button onClick={handleBookSlot}>Book Slot</button>
      </div>
    );
  }

  function generateDayRow(day, timeSlots) {
    return (
      <tr key={day}>
        <td>{day}</td>
        <td className="gray-cell">
          {timeSlots.map((timeSlot) => (
            <button
              key={`${day}-${timeSlot}`}
              onClick={() => handleTimeSlotClick(day, timeSlot)}
              className={isSlotBooked(bookedSlots, day, timeSlot) ? 'booked-slot' : ''}
              disabled={isSlotBooked(bookedSlots, day, timeSlot)}
            >
              {timeSlot}
            </button>
          ))}
          {bookingDetails.day === day && renderBookingForm()}
        </td>
      </tr>
    );
  }

  const daysAndTimeSlots = [
    { day: 'Sunday', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] }, 
    { day: 'Monday', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] }, 
    { day: 'Tuesday', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Wednesday', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] }, 
    { day: 'Thursday', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] }, 
    { day: 'Friday', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Saturday', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
  ];

  return (
    <table className="appointment-table">
      <thead>
        <tr>
          <th colSpan="2">Book Your Appointment Slot</th>
        </tr>
        <tr>
          <th>Day</th>
          <th>Available Time</th>
        </tr>
      </thead>
      <tbody>
        {daysAndTimeSlots.map(({ day, timeSlots }) => generateDayRow(day, timeSlots))}
      </tbody>
    </table>
  );
}

export default AppointmentTable;
