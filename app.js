import express from "express";
const app = express(); //Create an express application
const PORT = process.env.PORT || 8000; // Define the port

import {
  addResponse,
  getResponses,
  getResponseByID,
  editResponse,
  deleteResponse,
} from "./responseFunctions.js";

//Needed this for post (addResponses) to work
app.use(express.json());

// Create a test GET request handler (/ root path)
app.get("/", function (req, res) {
  // Create a response object
  const responseObj = {
    status: "success",
    data: {
      msg: "This is the root. Please try /responses for more options.",
    },
  };
  //Sending a response
  res.json(responseObj);
});

//Create a custom middleware function that logs request details to the console (E.g. the method, URL, time, etc.)
// Define a middleware function called 'logger'
function logger(req, res, next) {
  // Get the current timestamp
  const timestamp = Date.now();

  // Log information about the incoming request
  console.log(
    `${req.method} ${req.url} ${timestamp} ${req.ip} ${req.query} ${req.get(
      "User-Agent"
    )} ${req.body}`
  );
  // Call the 'next' function to pass control to the next middleware or route handler
  next();
}
// Use the 'logger' middleware in an Express.js application (assuming 'app' is an instance of Express)
app.use(logger);

//GET route handler for all responses
//Define a route for handling GET requests to a specific URL
app.get("/responses", async function (req, res) {
  //Call the previously written function to get all responses
  const responsesArray = await getResponses();
  //Prepare a response
  const responseObj = {
    status: "success",
    data: responsesArray,
  };
  //Send the data as a JSON response
  res.status(200).json(responseObj);
});

//Create a GET route handler that gets a particular response
//Define a route for handling GET requests to a specific URL
app.get("/responses/:id", async function (req, res) {
  //Retrieve the "id" parameter from the url
  const id = req.params.id;
  //Call the previously written function to get data
  const responseById = await getResponseByID(id);
  //Prepare a response
  const responseObj = {
    status: "success",
    data: responseById,
  };
  //Send the data as a JSON response
  res.json(responseObj);
});

//Create the POST route handler
//Define a route for handling a POST request to a specific URL
app.post("/responses", async function (req, res) {
  //Define responseText
  const responseText = req.body.responseText;
  //Call a previously written function to add new response
  const newResponse = await addResponse(responseText);
  //Prepare a response
  const responseObj = {
    status: "success",
    data: newResponse,
  };
  //Send the data as a JSON response
  return res.status(201).json(responseObj);
});

// Create PATCH route handler
//Edit resonse by ID
app.patch("/responses/:id", async function (req, res) {
  //Retrieve ID param from URL
  const id = req.params.id;
  //Define responseText
  const newResponseText = req.body.responseText;
  //Call a previously written function to edit quote by id
  const editResponseById = await editResponse(id, newResponseText);
  //Prepare a response
  const responseObj = {
    status: "success",
    data: editResponseById,
  };
  //Send the data as a JSON response
  res.status(200).json(responseObj);
});

//Create the DELETE route handler
app.delete("/responses/:id", async function (req, res) {
  //Retrieve ID param from URL
  const id = req.params.id;
  //Call an imported function to delete response by id
  const deleteResponseById = await deleteResponse(id);
  //Prepare a response
  const responseObj = {
    status: "sucess",
    data: deleteResponseById,
  };
  //Send the data as a JSON response
  res.status(200).json(responseObj);
});

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
