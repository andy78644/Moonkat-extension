import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Browser from "webextension-polyfill";
import TagBar from '../Transfer/MoreTags/TagBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReportForm from './ReportForm';

const params = new URLSearchParams(window.location.search);

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

const Report = () =>{
    const [reportFlow, setReportFlow] = useState(0);
    const handleSubmit = async () => {
        const windowId = await Browser.windows.getCurrent()
        Browser.windows.remove(windowId.id!)
    }
    return (
        <div>
            <div>
                Report Contract
            </div>
            <ReportForm />
            <div>
                This is a malicious contract
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="text">Yes</Button> 
                <Button onClick={()=>{setReportFlow(1)}} variant="text">No</Button>
            </Stack>

            {
            reportFlow == 1 &&
            <div>
                <div>
                    More related tags about the contract
                </div>
                <Button variant="text">AddTags</Button>
                <TagBar />
                <div>
                    More detail about the contract
                </div>
                <ReportForm />
                <Button onClick={handleSubmit} variant="text">Send</Button>
            </div>
            }
        </div>
    );
};

root.render(
    <Report />
);

export default Report;