const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter.js');

require('dotenv').config();
require('./Models/db.js');

const PORT = process.env.PORT || 8000;

app.get('/ping', (req, res) => {
    res.send('PING');
});

app.use(bodyParser.json());
// Allow specific origin
app.use(cors({
  origin: 'https://expense-tracker-ui-brown.vercel.app', // Allow requests from your UI
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Routes
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
