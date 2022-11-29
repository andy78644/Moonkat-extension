import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter"; 

export default axios.create({
  // Change the baseURL to get the cloud service
    baseURL: "http://127.0.0.1:8080",
    headers: {
      "Content-type": "application/json"
    },
    adapter: fetchAdapter
  });