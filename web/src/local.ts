import axios from "axios";

export default axios.create({
  // Change the baseURL to get the cloud service
    baseURL: "http://127.0.0.1:8080/api",
    headers: {
      "Content-type": "application/json"
    }
  });