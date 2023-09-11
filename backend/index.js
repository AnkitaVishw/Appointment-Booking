const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const twilio = require('twilio'); 
const app = express();
const port = 3001;

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

const accountSid = ''; 
const authToken = '';
const twilioClient = new twilio(accountSid, authToken);


app.use(express.json());


app.post('/api/appointments', (req, res) => {
  const { day, date, timeSlot, name, age, phoneNumber } = req.body;

  
  const insertQuery = 'INSERT INTO appointments (day, appointment_date, timeSlot, name, age, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)';

  
  db.query(insertQuery, [day, date, timeSlot, name, age, phoneNumber], (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ err });
      return;
    }

    const bookedData = {
      day,
      date,
      timeSlot,
      name,
      age,
      phoneNumber,
    };

    sendSmsNotification(bookedData);

  
    res.json(bookedData);
  });
});


function sendSmsNotification(appointmentDetails) {
  const { name, phoneNumber, day, date, timeSlot } = appointmentDetails;

  const message = `Dear ${name}, your appointment on ${day} (${date}, ${timeSlot}) has been confirmed.`;

  twilioClient.messages
    .create({
      body: message,
      from: '+12512202857',
      to: '+919369730596', 
    })
    .then((message) => console.log('SMS notification sent:', message.sid))
    .catch((error) => console.error('Error sending SMS notification:', error));
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
