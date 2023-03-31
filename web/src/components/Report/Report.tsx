import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReportForm from './ReportForm';
import Prompt from './Prompt'
import SectionHeader from './SectionHeader'
import Campaign from '../../assets/campaign.png'
import PriceTag from '../../assets/pricetag.png'
import Notification from '../../assets/notification.png'

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

    const [reportFlow, setReportFlow] = useState(0);
    const [selected, setSelected] = useState('');
    const [isPrompt, setPrompt] = useState(false);
    const [reportName, setReportName] = useState('DefaultName')
    const [reportDescription, setReportDescription] = useState('DefaultDescription')
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
            <div id="reportTitle"> Report Contract & Address </div>
            <ReportForm onTextValue={handleReportName} placeholder="What's the address name?" formHeight={50} />
            <SectionHeader icon={Campaign} content={"Is this a malicious contract?"}/>
            <Stack sx={{ marginLeft: 0.5, marginRight: 0.5 }} spacing={3} direction="row">
                <Button sx={()=>(
                    selected === 'yes' ? 
                    {
                        color: 'white', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                        borderRadius: 5,
                        backgroundColor: "#77736A",
                        fontWeight: "500",
                        width: '50%'
                    } :
                    {
                        color: '#434343', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                        borderRadius: 5,
                        backgroundColor: "#DFD8C9",
                        fontWeight: "500",
                        width: '50%'
                    }
                )} onClick={() => { setReportFlow(1); setSelected('yes'); }} variant="text">Yes</Button>
                <Button sx={()=>(
                    selected === 'no' ? 
                    {
                        color: 'white', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                        borderRadius: 5,
                        backgroundColor: "#77736A",
                        fontWeight: "500",
                        width: '50%'
                    } :
                    {
                        color: '#434343', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                        borderRadius: 5,
                        backgroundColor: "#DFD8C9",
                        fontWeight: "500",
                        width: '50%'
                    }
                )} onClick={() => { setReportFlow(1); setSelected('no'); }} variant="text">No</Button>
            </Stack>
            {
                reportFlow == 1 &&
                <div>
                    <SectionHeader icon={PriceTag} content={"More related tags about the contract"}/>
                    <SectionHeader icon={Notification} content={"More detail about this smart contract"}/>
                    <ReportForm onTextValue={handleDescription} placeholder="Share more detail with the community" formHeight={130} />
                    <Stack sx={{ mx: 0.5, mt: 4 }}>
                        <Button sx={{
                                    color: '#434343',
                                    '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A', },
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