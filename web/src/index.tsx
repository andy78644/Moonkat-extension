import React from "react";
import ReactDOM from "react-dom/client";

import Main from "./components/Main/Main";

const params = new URLSearchParams(window.location.search);

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
document.documentElement.setAttribute("lang", 'zh-Hant');
root.render(
    
    <Main
        id={params.get("id")}
        mode={params.get("mode")}
        browserMsg={params.get("browserMsg")}
    />
);