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
if (process.env.WORK_ENV === 'prod') {
    console.log = function () {};
}
const Report = () => {

    const contractAddress = params.get('contractAddress');
    const userAddress = params.get('userAddress');

    const [reportFlow, setReportFlow] = useState(0);
    const [isMalicious, setIsMalicious] = useState<boolean>();
    const [isPrompt, setPrompt] = useState(false);
    const [reportName, setReportName] = useState('DefaultName')
    const [reportDescription, setReportDescription] = useState('DefaultDescription')
    const [tags, setTags] = useState<Array<string>>([]);
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
                        userAddress={userAddress}
                        contractAddress={contractAddress}
                        isMalicious={isMalicious}
                        name={reportName}
                        tags={tags}
                        description={reportDescription}
                        submit={isPrompt}
                        onSubmit={setPrompt}
                    /> :
                    null
            }
            <div id="reportTitle"> Report Contract & Address </div>
            <NameForm onTextValue={handleReportName} formHeight={24} />
            <SectionHeader icon={Campaign} content={"Is this a malicious contract?"} />
            <Stack sx={{ margin: "0px 16px 16px 16px" }} spacing={'16px'} direction="row">
                <Button sx={() => (
                    isMalicious === true ?
                        {
                            color: '#FFF8EA', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            backgroundColor: "#77736A",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            lineHeight: '120%',
                            fontFamily: 'Lato-Semibold'
                        } :
                        {
                            color: '#77736A', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            backgroundColor: "#FFF8EA",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            lineHeight: '120%',
                            fontFamily: 'Lato-Semibold'
                        }
                )} onClick={() => { setReportFlow(1); setIsMalicious(true); }} variant="text">Yes</Button>
                <Button sx={() => (
                    isMalicious === false ?
                        {
                            color: '#FFF8EA', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            backgroundColor: "#77736A",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            lineHeight: '120%',
                            fontFamily: 'Lato-Semibold'
                        } :
                        {
                            color: '#77736A', '&:hover, &:focus': { color: 'white', backgroundColor: '#77736A' },
                            backgroundColor: "#FFF8EA",
                            fontWeight: "500",
                            width: '50%',
                            height: '27px',
                            lineHeight: '120%',
                            fontFamily: 'Lato-Semibold'
                        }
                )} onClick={() => { setReportFlow(1); setIsMalicious(false); }} variant="text">No</Button>
            </Stack>
            {
                reportFlow == 1 &&
                <div>
                    <SectionHeader icon={PriceTag} content={"More related tags about the contract"} />
                    <TagForm onSetTags={setTags}/>
                    <SectionHeader icon={Notification} content={"More detail about this smart contract"} />
                    <ReportForm onTextValue={handleDescription} formHeight={92} />
                </div>
            }
            <Stack sx={{ width: 'calc(100% - 32px)', margin: "16px", position: "fixed", left: 0, bottom: 0 }} spacing={'16px'} direction="row">
                <Button sx={
                    {
                        padding: '8px',
                        color: '#77736A',
                        border: "2px solid #77736A",
                        backgroundColor: "#FFF8EA",
                        fontWeight: "500",
                        width: '50%',
                        lineHeight: '120%',
                        height: '35px',
                        fontSize: '16px',
                        textTransform: 'none',
                        fontFamily: 'Lato-Bold'
                    }
                } onClick={() => { handleSubmit(false) }} variant="text">Cancel</Button>
                <Button sx={
                    {
                        padding: '8px',
                        color: '#FFF8EA', '&:hover, &:focus': { backgroundColor: "#77736A", opacity: 0.75 },
                        backgroundColor: "#77736A",
                        fontWeight: "500",
                        width: '50%',
                        height: '35px',
                        lineHeight: '120%',
                        fontSize: '16px',
                        textTransform: 'none',
                        fontFamily: 'Lato-Bold'
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