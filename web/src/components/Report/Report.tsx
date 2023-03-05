import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import TagBar from '../Transfer/MoreTags/TagBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReportForm from './ReportForm';
import Prompt from './Prompt'
import CampaignIcon from '@mui/icons-material/Campaign';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AddIcon from '@mui/icons-material/Add';

import './Report.css'

const params = new URLSearchParams(window.location.search);

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"))

const tagExample1: any[] = [
    {
        name: "BAYC token",
        color: "red",
    },
    {
        name: "Monkey token",
        color: "red",
    },
    {
        name: "Bored Ape",
        color: "red",
    },
]

const Report = () => {

    const contractAddress = params.get('contractAddress');
    const userAddress = params.get('userAddress');
    console.log("contractAddress: " + contractAddress)
    console.log("userAddress: " + userAddress)

    const [reportFlow, setReportFlow] = useState(0);
    const [isPrompt, setPrompt] = useState(false);
    const [reportName, setReportName] = useState('')
    const [reportDescription, setReportDescription] = useState('')
    const handleSubmit = async () => {
        setPrompt(true)
    }
    const handleReportName = async (name: string) => {
        setReportName(name)
    }
    const handleDescription = async (description: string) => {
        setReportDescription(description)
    }
    return (
        <div id="report">
            {
                isPrompt ?
                    <Prompt 
                        name={reportName}
                        contractAddress={contractAddress}
                        userAddress={userAddress}
                        description={reportDescription}
                        submit={isPrompt} 
                        onSubmit={setPrompt} 
                    /> :
                    <div></div>
            }
            <div id="reportTitle">
                Report Contract
            </div>
            <ReportForm onTextValue={handleReportName} placeholder="What's the address Name?" formHeight={50} />
            <div id="reportMalicious">
                <CampaignIcon id="reportCampaignIcon" /> &nbsp;
                <div id="reportMaliciousContent">Is this a malicious contract ?</div>
            </div>
            <Stack sx={{ marginLeft: 0.5, marginRight: 0.5 }} spacing={3} direction="row">
                <Button sx={{ color: '#434343', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                    borderRadius: 5,
                    backgroundColor: "#DFD8C9",
                    fontWeight: "500",
                    width: '50%'
                }} onClick={() => { setReportFlow(1) }} variant="text">Yes</Button>
                <Button sx={{ color: '#434343', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A', },
                    borderRadius: 5,
                    backgroundColor: "#DFD8C9",
                    fontWeight: "500",
                    width: '50%'
                }} onClick={() => { setReportFlow(1) }} variant="text">No</Button>
            </Stack>

            {
                reportFlow == 1 &&
                <div>
                    {/* <div id="reportMoreTags">
                        <LocalOfferIcon id="reportLocalOfferIcon" /> &nbsp;
                        <div id="reportMoreTagsContent"> More related tags about the contract </div>
                    </div>
                    <Button sx={{
                        color: '#434343',
                        margin: 0.5,
                        '&:hover, &:focus': {
                            color: 'white',
                            backgroundColor: '#77736A',
                        },
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: "#DFD8C9",
                        fontSize: 15,
                        fontWeight: "500",
                        width: '35%'
                    }}
                        startIcon={<AddIcon />}
                        variant="text">ADD TAGS</Button>
                    <TagBar tags={tagExample1} tagDisable={false} /> */}
                    <div id="reportMoreDetails">
                        <FeedbackIcon id="reportFeedbackIcon" /> &nbsp;
                        <div id="reportMoreDetailsContent"> More detail about the contract </div>
                    </div>
                    <ReportForm onTextValue={handleDescription} placeholder="Share more detail with the community" formHeight={130} />
                    <Stack sx={{ mx: 0.5, mt: 4 }}>
                        <Button sx={{ color: '#434343', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A', },
                            height: 40,
                            borderRadius: 5,
                            backgroundColor: "#DFD8C9",
                            fontSize: 15,
                            fontWeight: "500",
                            width: '100%'
                        }}
                            onClick={handleSubmit}
                            variant="text">Send
                        </Button>
                    </Stack>
                </div>
            }
        </div>
    );
};

root.render(
    <Report />
);

export default Report;