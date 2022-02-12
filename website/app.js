/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "appid=38f2e76f80a102aac53d76765dc65879&units=imperial";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const serverUrl = "http://localhost:8000";

/**
 * Takes a date object, returns a string of the date in the format YYYY-MM-DD.
 * @param date - The date to format.
 */
const formatYmd = (date) => date.toISOString().slice(0, 10);

/* The event listener is added to the generate button
 * Upon click it triggers the async call chain
 * getWeatherAPIData --> postData --> getDataFromServer
 * Finally the webpage is updated with the serverside data.
 */
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
  let zipElem = document.getElementById("zip").value;
  let countryElem = document.getElementById("country").value;

  /* Create URL that will be used to request data from the API.
   * Should probably include some error checking
   */
  url = apiUrl + "?" + "zip=" + zipElem + "," + countryElem + "&" + apiKey;

  /* Get the weather API data and store it in the userData object. */
  getWeatherAPIData(url).then((data) => {
    userData = {
      temp: data.main.temp + "F",
      date: formatYmd(new Date()),
      comment: document.getElementById("feelings").value,
    };
    /* Post data to server */
    postData(serverUrl + "/all", userData).then((newData) => {
      /* The getDataFromServer() function is called, which returns a promise.
       * web-page is updated with server side data.
       */
      getDataFromServer(serverUrl + "/all").then((serverData) => {
        console.log("More here!!!");
        let entryDate = document.getElementById("date");
        let entryTemp = document.getElementById("temp");
        let entryContent = document.getElementById("content");
        entryDate.innerText = serverData.date;
        entryTemp.innerText = serverData.temp;
        entryContent.innerText = serverData.comment;
      });
    });
  });
});

/**
 * Function getWeatherAPIData
 * It takes a URL as an argument, fetches the data from that URL, and returns the
 * data as a JSON object
 * @param [url] - The URL of the API endpoint.
 * @returns The data from the API call.
 */
const getWeatherAPIData = async (url = "") => {
  const response = await fetch(url);

  /* The try...catch block is used to catch any errors that may occur while parsing
  the JSON data. */
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Function postData
 * It takes a URL and some data,
 * and sends a POST request to that URL with the data
 * @param [url] - The URL to which the request is sent.
 * @param [data] - The data that will be sent to the server.
 * @returns The `postData` function returns a promise.
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

/**
 * Function getDataFromServer
 * It takes a URL as an argument, fetches the data from the server, and returns the
 * data as a JSON object
 * @param [url] - The URL of the API endpoint.
 * @returns The data from the server.
 */
const getDataFromServer = async (url = "") => {
  const response = await fetch(url);

  /* The try...catch block is used to catch any errors that may occur while parsing
  the JSON data. */
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
