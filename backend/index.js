const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Configure CORS to allow requests from your React app (replace 'http://localhost:3000' with your frontend URL if needed)
app.use(cors({ origin: 'http://localhost:3000' }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'ankita',
  password: 'Root.123',
  database: 'mysql',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Parse JSON request bodies
app.use(express.json());

// Handle booking appointments
app.post('/api/appointments', (req, res) => {
  const { day, timeSlot, name, age, phoneNumber } = req.body;

  // Assuming you have a 'bookings' table with columns: day, timeSlot, name, age, phoneNumber
  const insertQuery = 'INSERT INTO appointments (day, timeSlot, name, age, phoneNumber) VALUES (?, ?, ?, ?, ?)';

  // Execute the SQL INSERT query
  db.query(insertQuery, [day, timeSlot, name, age, phoneNumber], (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ err });
      return;
    }

    // Assuming the insertion was successful, return the booked data
    const bookedData = {
      day,
      timeSlot,
      name,
      age,
      phoneNumber,
    };

    // Send a response with the booked data
    res.json(bookedData);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
