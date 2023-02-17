import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter"; 

const Url = {
  "dev": "http://127.0.0.1:8080",
  "prod": "https://test.moonkat.app/"
}
const type = process.env.WORK_ENV
let baseUrl = Url.dev
if (type === 'prod'){
   baseUrl = Url.prod;
}

export default axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-type": "application/json"
    },
    adapter: fetchAdapter
});