import React from "react";
import Browser from "webextension-polyfill";
import ReactDOM from "react-dom/client";
import IconButton from '@mui/material/IconButton'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const params = new URLSearchParams(window.location.search);

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

interface Props {
    id: any
    context: any,
    signatureVersion: any,
    signMethod: any
};


const Tmp = (props: Props) => {
    const context = props.context
    const id = props.id
    const signatureVersion = props.signatureVersion
    const signMethod = props.signMethod

    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);
    return (
        <div>
            This Sign is:&nbsp;{signatureVersion} <br></br>
            This Sign Method is:&nbsp;{signMethod} <br></br>
            This Sign Content is:&nbsp;{context} <br></br>
            <IconButton onClick={reject}>
                <DisabledByDefaultIcon sx={{display: "inline-block"}}/>
            </IconButton>
            <IconButton onClick={accept}>
                <CheckCircleOutlineIcon sx={{display: "inline-block"}}/>
            </IconButton>
        </div>
        
    )
}
root.render(
    // if signature create signature page
    <Tmp
        context={params.get("context")}
        id={params.get("id")}
        signatureVersion={params.get("signatureVersion")}
        signMethod={params.get("signMethod")}
    />
);

export default Tmp

