import React, { useState } from 'react'
import Browser from "webextension-polyfill";
import ReactDOM from 'react-dom/client'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ReportForm from './Form/ReportForm'
import NameForm from './Form/NameForm'
import TagForm from './Form/TagForm'
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

const Report = () => {

    const contractAddress = params.get('contractAddress');
    const userAddress = params.get('userAddress');

    const [reportFlow, setReportFlow] = useState(0);
    const [selected, setSelected] = useState('');
    const [isPrompt, setPrompt] = useState(false);
    const [reportName, setReportName] = useState('DefaultName')
    const [reportDescription, setReportDescription] = useState('DefaultDescription')
    const handleSubmit = async (isSubmit: boolean) => {
        if (isSubmit) setPrompt(true)
        else {
            const windowId = await Browser.windows.getCurrent()
            if (windowId) Browser.windows.remove((await windowId).id!)
        }
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
                    null
            }
            <div id="reportTitle"> Report Contract & Address </div>
            <NameForm onTextValue={handleReportName} formHeight={40} />
            <SectionHeader icon={Campaign} content={"Is this a malicious contract?"} />
            <Stack sx={{ margin: "0px 16px 16px 16px" }} spacing={3} direction="row">
                <Button sx={() => (
                    selected === 'yes' ?
                        {
                            color: '#FFF8EA', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            borderRadius: 5,
                            backgroundColor: "#77736A",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            textTransform: 'none'
                        } :
                        {
                            color: '#77736A', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            borderRadius: 5,
                            backgroundColor: "#FFF8EA",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            textTransform: 'none'
                        }
                )} onClick={() => { setReportFlow(1); setSelected('yes'); }} variant="text">Yes</Button>
                <Button sx={() => (
                    selected === 'no' ?
                        {
                            color: '#FFF8EA', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            borderRadius: 5,
                            backgroundColor: "#77736A",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            textTransform: 'none'
                        } :
                        {
                            color: '#77736A', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            borderRadius: 5,
                            backgroundColor: "#FFF8EA",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            textTransform: 'none'
                        }
                )} onClick={() => { setReportFlow(1); setSelected('no'); }} variant="text">No</Button>
            </Stack>
            {
                reportFlow == 1 &&
                <div>
                    <SectionHeader icon={PriceTag} content={"More related tags about the contract"} />
                    <TagForm />
                    <SectionHeader icon={Notification} content={"More detail about this smart contract"} />
                    <ReportForm onTextValue={handleDescription} formHeight={92} />
                </div>
            }
            <Stack sx={{ width: 'calc(100% - 32px)', margin: "16px", position: "fixed", left: 0, bottom: 0 }} spacing={3} direction="row">
                <Button sx={
                    {
                        color: '#77736A',
                        borderRadius: 5,
                        border: "2px solid #77736A",
                        backgroundColor: "#FFF8EA",
                        fontWeight: "500",
                        width: '50%',
                        height: '27px',
                        textTransform: 'none'
                    }
                } onClick={() => { handleSubmit(false) }} variant="text">Cancel</Button>
                <Button sx={
                    {
                        color: '#FFF8EA', '&:hover, &:focus': { backgroundColor: "#77736A", opacity: 0.75 },
                        borderRadius: 5,
                        backgroundColor: "#77736A",
                        fontWeight: "500",
                        width: '50%',
                        height: '27px',
                        textTransform: 'none'
                    }
                } onClick={() => { handleSubmit(true) }} variant="text">Send</Button>
            </Stack>
        </div>
    );
};

root.render(
    <Report />
);

export default Report;