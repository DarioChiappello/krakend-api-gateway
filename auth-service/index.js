const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const JWT_SECRET = 'supersecretkey';

app.post('/login', async (req, res) => {
  try {
    // Simulate credentials validation
    const payload = {
      userId: 123,
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    
    const token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
    
    
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error interno');
  }
});

app.listen(8000, () => {
  console.log('Auth service running on port 8000');
});