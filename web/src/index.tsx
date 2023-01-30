import React from "react";
import ReactDOM from "react-dom/client";

import Main from "./components/Main/Main";

const params = new URLSearchParams(window.location.search);

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Main
        id={params.get("id")}
        asset={params.get("asset")}
        spender={params.get("spender")}
        chainId={params.get("chainId")}
        name={params.get("name")}
        symbol={params.get("symbol")}
        bypassed={params.get("bypassed")}
        assetOut={params.get("assetOut")}
        assetIn={params.get("assetIn")}
        gas={params.get("gas")}
        outSymbol={params.get("outSymbol")}
        inSymbol={params.get("inSymbol")}
    />
);