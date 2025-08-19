const mongoose = require("mongoose");

const connectDB = async () => {
    return mongoose.connect(process.env.LIVE_URL)

    .then(() => {
        console.log("Database Connection succesful");
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = connectDB;