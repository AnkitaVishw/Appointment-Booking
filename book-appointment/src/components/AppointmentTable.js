import React, { useState } from 'react';
import './AppointmentTable.css';

function isSlotBooked(bookedSlots, day, date, timeSlot) {
  const slotKey = `${day}'s ${date} ${timeSlot}`;
  return bookedSlots.includes(slotKey);
}

function AppointmentTable() {
  const demoBookedSlots = ["Sunday's 2023-09-10 10am-12pm", "Monday's 2023-09-11 1pm-4pm"];
  const [bookedSlots, setBookedSlots] = useState(demoBookedSlots);

  const [bookingDetails, setBookingDetails] = useState({
    day: '',
    date: '',
    timeSlot: '',
    name: '',
    age: '', 
    phoneNumber: '', 
  });

  function handleTimeSlotClick(day, date, timeSlot) {
    const slotKey = `${day}'s ${date} ${timeSlot}`;

    if (isSlotBooked(bookedSlots, day, date, timeSlot)) {
      alert(`The ${slotKey} slot is already booked.`);
    } else {
      setBookingDetails({
        day,
        date,
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

    const age = bookingDetails.age.trim(); 

    if (!age) {
      alert('Age cannot be empty.');
      return;
    }

    const phoneNumber = parseInt(bookingDetails.phoneNumber, 10);

    if (isNaN(phoneNumber)) {
      alert('Phone Number must be a valid integer.');
      return;
    }

    const slotKey = `${bookingDetails.day}'s ${bookingDetails.date} ${bookingDetails.timeSlot}`;
    if (isSlotBooked(bookedSlots, bookingDetails.day, bookingDetails.date, bookingDetails.timeSlot)) {
      alert(`The ${slotKey} slot is already booked.`);
    } else {
     
  
  
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
          date: '',
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
    
  }

  function renderBookingForm() {
    return (
      <div className="booking-form">
        <input
          type="date"
          value={bookingDetails.date}
          onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={bookingDetails.name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
        />
        <input
          type="text" // Allow free text input for Age
          placeholder="Age"
          value={bookingDetails.age}
          onChange={(e) => setBookingDetails({ ...bookingDetails, age: e.target.value })}
        />
        <input
          type="tel" // Use type="tel" for Phone Number
          placeholder="Phone Number"
          value={bookingDetails.phoneNumber}
          onChange={(e) => setBookingDetails({ ...bookingDetails, phoneNumber: e.target.value })}
        />
        <button onClick={handleBookSlot}>Book Slot</button>
      </div>
    );
  }

  function generateDayRow(day, date, timeSlots) {
    return (
      <tr key={day}>
        <td>{day}</td>
        <td className="gray-cell">
          {timeSlots.map((timeSlot) => (
            <button
              key={`${day}-${date}-${timeSlot}`}
              onClick={() => handleTimeSlotClick(day, date, timeSlot)}
              className={isSlotBooked(bookedSlots, day, date, timeSlot) ? 'booked-slot' : 'not-booked-slot'}
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
    { day: 'Sunday', date: '2023-09-10', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Monday', date: '2023-09-11', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Tuesday', date: '2023-09-12', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Wednesday', date: '2023-09-13', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Thursday', date: '2023-09-14', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Friday', date: '2023-09-15', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    { day: 'Saturday', date: '2023-09-16', timeSlots: ['10am-12pm', '1pm-4pm', '5pm-7pm', '7pm-9pm'] },
    
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
        {daysAndTimeSlots.map(({ day, date, timeSlots }) => generateDayRow(day, date, timeSlots))}
      </tbody>
    </table>
  );
}

export default AppointmentTable;
