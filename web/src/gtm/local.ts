import axios from "axios";

let GTM_API_SECRET = "ffKUXuaDSuq3GufB7TpDZA";
let GTM_ID = "G-DCSV30DWMK";
let baseUrl = `https://www.google-analytics.com/mp/collect?measurement_id=${GTM_ID}&api_secret=${GTM_API_SECRET}`;

export default axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-type": "application/json"
    },
});