const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("DB connected Successfully..!");
    }).catch((err) => {
        console.log("Not Connected", err);
    })