import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter"; 

const Url = {
  "dev": "http://127.0.0.1:8080",
  "prod": "https://dev.moonkat.app/"
}
const type = process.env.WORK_ENV
let baseUrl = Url.dev
if (type === 'dev'){
   baseUrl = Url.dev;
}

export default axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-type": "application/json"
    },
    adapter: fetchAdapter
});