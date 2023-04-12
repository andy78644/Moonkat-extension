import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter"; 

const Url = {
  "local": "http://127.0.0.1:8080",
  "dev": "https://dev.moonkat.app/",
  "prod": "https://prod.moonkat.app/",
  "test": "https://test.moonkat.app/",
}
const type = process.env.WORK_ENV
let baseUrl = Url.prod
if (type === 'dev'){
  baseUrl = Url.dev;
}
if (type === 'local'){
  baseUrl = Url.local;
}
if (type === 'test'){
  baseUrl = Url.test;
}

export default axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-type": "application/json"
    },
    adapter: fetchAdapter
});