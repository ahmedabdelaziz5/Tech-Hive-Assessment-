const express = require("express");
const cors = require('cors');
const ApplicationRoutes = require('./routes');
require("dotenv").config();

// express app
const app = express();
app.use(express.json());

// cors options 
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type'],
};

// payload size limit
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false, limit: '100mb' }));

// using params request  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection 
const { databaseConnection } = require("./config/db.config");
databaseConnection();

// server routes
app.use(cors(corsOptions));
ApplicationRoutes(app);

// HTTP server
const http = require("http");
const server = http.createServer(app);

// error handler
const errorManger = require('./helpers/apiError');
app.use(express.static('public'));
app.use(errorManger.handler);
app.use(errorManger.notFound);

// server listening
server.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and running on port ${process.env.PORT}!`)
});