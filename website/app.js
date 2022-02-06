/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "appid=38f2e76f80a102aac53d76765dc65879&units=imperial";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const testApiZip = "zip=9270,DK";
const serverUrl = "http://localhost:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/* The event listener is added to the generate button, which is then used to call
the getWeatherAPIData function. */
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
  let zipElem = document.getElementById("zip").value;
  let countryElem = document.getElementById("country").value;
  url = apiUrl + '?' + 'zip=' + zipElem + ',' + countryElem + "&" + apiKey;

  getWeatherAPIData(url);
});


/**
 * Get Weather data.
 * It makes a request to the API and returns the data.
 * @param [url] - The URL to fetch data from.
 */
const getWeatherAPIData = async (url = "") => {
  const response = await fetch(url);

  /* The try...catch block is used to catch any errors that may occur while parsing
  the JSON data. */
  try {
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Function postData.
 * It takes a URL and some data,
 * and sends a POST request to that URL with the data
 * @param [url] - The URL to which the request is sent.
 * @param [data] - The data that will be sent to the server.
 * @returns The `postData` function returns a response.
 */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  /* The try...catch block is used to catch any errors that may occur while parsing
  the JSON data. */
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */

// TEST CODE BELOW HERE
// url = apiUrl + '?' + testApiZip + "&" + apiKey;
// getWeatherAPIData(url);

// testData = {
//   temp: "11",
//   date: "20-1-2022",
//   comment: "Feeling good",
// };
// postData(serverUrl + "/all", testData);
