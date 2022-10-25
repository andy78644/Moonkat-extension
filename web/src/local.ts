import axios from "axios";

export default axios.create({
  // Change the baseURL to get the cloud service
    baseURL: "http://34.110.225.103:80/api",
    headers: {
      "Content-type": "application/json"
    }
  });