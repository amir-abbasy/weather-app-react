import axios from "axios";
//base url to make reuests to the movie database
// const SERVER_HOST = "http://localhost:5000";
const SERVER_HOST = "https://weather-app-node-production.up.railway.app/";

const instance = axios.create({
  baseURL: SERVER_HOST,
  //   withCredentials: true,
  headers: {
    // "x-auth-token": AUTH_TOKEN,
    "api-key": "weather-app-asdk54w654346",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to handle request errors
instance.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here if needed
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle response errors
instance.interceptors.response.use(
  (response) => {
    // Successful response; return the data
    return response.data;
  },
  (error) => {
    // Handle response error
    if (error.response) {
      // The request was made, and the server responded with a status code outside the 2xx range
      console.error(
        "Response Error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("General Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
