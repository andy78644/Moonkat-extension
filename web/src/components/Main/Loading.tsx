import React from "react";

import './Loading.css';

interface Props {

};

const Loading = (props: Props) => {
    return (
        <div id="loading">
            <div id="loadingFrame">
                <img id="loadingSloth" src={require("../../assets/loading.gif").default} alt="loading"/>
                <p id="simulating">Simulating...</p>
            </div>
        </div>
    )
}

export default Loading;