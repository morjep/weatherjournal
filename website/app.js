/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "38f2e76f80a102aac53d76765dc65879&units=imperial";
const apiUrl = "api.openweathermap.org/data/2.5/weather?";
const testApiZip = "zip=9270,DK";
const serverUrl = "http://localhost:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/**
 * Get Weather data.
 * It makes a request to the API and returns the data.
 * @param [url] - The URL to fetch data from.
 */
const getWeatherAPIData = async (url = "") => {
  const response = await fetch(url);

  try {
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */


// TEST CODE BELOW HERE
url = "https://" + apiUrl + testApiZip + "&appid=" + apiKey;
getWeatherAPIData(url);

testData = {
    "temp":"11",
    "date":"20-1-2022",
    "comment":"Feeling good"
 };
postData(serverUrl+'/all', testData);
