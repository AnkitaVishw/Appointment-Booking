const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

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

app.post('/api/appointments', (req, res) => {
  // Retrieve data from the request body
  const { day, timeSlot, name, age, phoneNumber } = req.body;

  // Assuming you have the following data after a successful booking
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
