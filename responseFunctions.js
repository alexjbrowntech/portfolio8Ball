import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
const filePath = path.resolve(process.cwd(), "magicresponses.json");

export async function addResponse(responseText) {
  // Read the existing responses from the JSON file
  const responsesJSON = await fs.readFile(filePath, "utf-8");
  // translating from json to js version
  const responses = JSON.parse(responsesJSON);
  // Create a new response object with a unique ID, and the provided text.
  const newResponse = {
    id: uuidv4(),
    responseText: responseText,
  };
  // Add the new Response to the existing Responses array
  responses.push(newResponse);
  // Write the updated Responses array back to the JSON file
  await fs.writeFile(filePath, JSON.stringify(responses, null, 2), "utf-8");
  // Return the newly added Response object
  return newResponse;
}

// Function to get all responses from the JSON file
export async function getResponses() {
  // Read the contents of the JSON file asynchronously using the 'fs' module
  const responsesJSON = await fs.readFile(filePath, "utf-8");
  // Parse the JSON data into a JavaScript array of responses
  const responses = JSON.parse(responsesJSON);
  // Return the array of responses
  return responses;
}

// Function to get a specific response by its ID from the JSON file
export async function getResponseByID(id) {
  // Read the contents of the JSON file asynchronously using the 'fs' module
  const responsesJSON = await fs.readFile(filePath, "utf-8");
  // Parse the JSON data into a JavaScript array of responses
  const responses = JSON.parse(responsesJSON);
  // Iterate through each response in the array
  for (const response of responses) {
    // Check if the 'id' property of the current response matches the provided 'id'
    if (response.id === id) {
      // If a matching response is found, return it
      return response;
    }
  }
  // If no matching response is found, return null
  return null;
}

// Define an asynchronous function called 'editResponse' that takes two parameters: 'id', and 'newResponseText'
export async function editResponse(id, newResponseText) {
  // Read the content of a file (specified by 'filePath') as a UTF-8 encoded string.
  const responsesJSON = await fs.readFile(filePath, "utf-8");

  // Parse the JSON string 'responsesJSON' into a JavaScript object.
  const responses = JSON.parse(responsesJSON);

  // Initialize a variable 'response' to null.
  let response = null;

  // Iterate through the 'responses' array to find the response with the specified 'id'.
  for (let i = 0; i < responses.length; i++) {
    if (responses[i].id === id) {
      // If a response with the matching 'id' is found, assign it to the 'response' variable.
      response = responses[i];

      // Update the response's 'responseText' property with 'newresponseText' if 'newResponseText' is provided; otherwise, keep the existing value.
      responses[i].responseText = newResponseText ?? responses[i].responseText;

      // Exit the loop since we've found and updated the desired response.
      break;
    }
  }
  await fs.writeFile(filePath, JSON.stringify(responses, null, 2), "utf-8");
  return response;
}

// Export an asynchronous function called 'deleteresponse' that takes an 'id' as a parameter.
export async function deleteResponse(id) {
  // Read the contents of the JSON file as a string using 'await' to make it asynchronous.
  const responsesJSON = await fs.readFile(filePath, "utf-8"); //added "fs."
  // Parse the JSON string into an array of response objects.
  const responses = JSON.parse(responsesJSON);
  // Initialize a variable to store the index of the response to be deleted.
  let responseIndex = null;
  // Loop through the 'responses' array to find the index of the response with the specified 'id'.
  for (let i = 0; i < responses.length; i++) {
    if (responses[i].id === id) {
      responseIndex = i; // Store the index if a matching response is found.
      break; // Exit the loop once a match is found.
    }
  }
  // Check if a response with the specified 'id' was found.
  if (responseIndex !== null) {
    // Use 'splice' to remove the response at the found index and store it in 'deletedResponses'.
    const deletedResponses = responses.splice(responseIndex, 1);
    // Write the modified 'responses' array back to the JSON file.
    await fs.writeFile(filePath, JSON.stringify(responses, null, 2), "utf-8"); //added "fs."
    // Return the deleted response (it's wrapped in an array, so access it using [0]).
    return deletedResponses[0];
  }
  // If no matching response was found, return 'null'.
  return null;
}