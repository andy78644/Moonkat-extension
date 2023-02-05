import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";
const params = new URLSearchParams(window.location.search);

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

interface Props {
    context: any
};

const Tmp = (props: Props) => {
    const context = props.context
    return (
        <div>Sign Content is:&nbsp;{context}</div>
    )
}
root.render(
    // if signature create signature page
    <Tmp
        context={params.get("context")}
    />
);

export default Tmp

