// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{
  console.log(`running on localhost: ${port}`);
  console.log(`use "curl localhost:${port}/health" for simple alive check`);
  console.log('- '.repeat(40));
});

/*
 Setup routes
*/


/**
 * Logs the request method and url to the console.
 * @param req - the request object
 */
function logRequest(req){
  console.log(`${req.method} request on ${req.url}`);
}


/* This is a simple health check that will return "Alive and kicking" if the server
is running. */
app.get("/health", (req, res) => {
  logRequest(req);
  res.send("Alive and kicking")
});

/* Sending the projectData object to the client. */
app.get('/all', (req, res) => {
  logRequest(req);
  res.send(projectData);
});

// Post Route
