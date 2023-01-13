import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import TagBar from '../Transfer/MoreTags/TagBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReportForm from './ReportForm';
import Prompt from './Prompt'

const params = new URLSearchParams(window.location.search);

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

const Report = () =>{
    const [reportFlow, setReportFlow] = useState(0);
    const [isPrompt, setPrompt] = useState(false);
    const [addressName, setAddressName] = useState('');
    const [detail, setDetail] = useState('');
    const handleAddressName = async () => {

    }
    const handleDetailContract = async () => {
        
    }
    const handleSubmit = async () => {
        setPrompt(true)
    }
    return (
        <div>
            {isPrompt ? <Prompt submit={isPrompt} onSubmit={setPrompt} /> : <div></div>}
            <div>
                Report Contract
            </div>
            <ReportForm operation={handleAddressName} placeholder="What's the address Name?"/>
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
                <ReportForm operation={handleDetailContract} placeholder="Share more detail with the community"/>
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