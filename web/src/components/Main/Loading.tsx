import React from "react";

import './Loading.css';

interface Props {

};

const Loading = (props: Props) => {
    return (
        <div id="loading">
            <img id="loadingSloth" src={require("../../assets/loading.gif").default} alt="loading" />
            <p id="simulating">Simulating...</p>
        </div>
    )
}

export default Loading;