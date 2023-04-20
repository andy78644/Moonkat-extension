import React, { useState, useEffect } from "react";
import Browser from "webextension-polyfill";
import dataService from "../../dataService";
import Success from "../../assets/reportSuccess.png"
import Fail from "../../assets/reportFail.png"

import './Prompt.css'

interface Props {
    userAddress: string | null,
    contractAddress: string | null,
    isMalicious: boolean | undefined,
    name: string,
    tags: Array<string>,
    description: string,
    submit: any,
    onSubmit: any
}

const Prompt = (props: Props) => {
    const getWindowId = async () => {
        return await Browser.windows.getCurrent()
    }
    const { userAddress, contractAddress, isMalicious, name, tags, description } = props
    let reportInfo = {
        Provider: userAddress,
        Address: contractAddress,
        isMalicious: isMalicious,
        Name: name,
        Tag: tags,
        Description: description
    };
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(false)

    useEffect(() => {

        console.log(reportInfo)

        const handlePrompt = (status: boolean) => {
            if (status) setStatus(true)
            else setStatus(false)
            setOpen(true)
        }

        const postReport = async (reportInfo: any) => {
            await dataService.postFeedBackByAddress(reportInfo)
                .then(res => {
                    handlePrompt(true)
                    console.log(`Successfully sumbit the report! ${res}`);
                    const windowId = getWindowId()
                    setTimeout(async () => {
                        if (windowId) {
                            Browser.windows.remove((await windowId).id!)
                        }
                    }, 3000)
                })
                .catch((err) => {
                    handlePrompt(false)
                    console.log(`Fail to sumbit the report! ${err}`)
                    const windowId = getWindowId()
                    setTimeout(async () => {
                        if (windowId) {
                            Browser.windows.remove((await windowId).id!)
                        }
                    }, 3000)
                })
        }
        postReport(reportInfo)
    }, [props.submit])

    const handleClose = async () => {
        const windowId = getWindowId()
        props.onSubmit(false)
        Browser.windows.remove((await windowId).id!)
    };

    return (
        <dialog style={{ backgroundColor: `${status ? "#EEFBF6" : "#FBEEEE"}` }} id="reportDialog" open={open} onClose={handleClose}>
            <div id="dialogContainer">
                <img src={status ? Success : Fail} width="26.67px" height="24px" />
                <div id="dialogContent">
                    <p style={{ fontWeight: 900, fontSize: 16, color: '#434343', margin: 0, marginBottom: 4 }}>
                        {
                            status ?
                                <span>Report Successfully</span> :
                                <span>Report Failed</span>
                        }
                    </p>
                    <p style={{ fontSize: 14, color: '#77736A', margin: 0 }}>
                        {
                            status ?
                                <span>Thanks for your contribution</span> :
                                <span>Please contract us if it happen again</span>
                        }
                    </p>
                </div>
                <form id="dialogButton" method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    )
}

export default Prompt;