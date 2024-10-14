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
app.use(cors());

// Routes
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
