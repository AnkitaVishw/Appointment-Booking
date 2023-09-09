const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// ... other middleware and route definitions

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
