const mongoose = require("mongoose");

// function to connect to the database using connection string
exports.databaseConnection = () => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(process.env.CONNECTION_STRING)
        .then(() => { console.log("DB config is done ...") })
};