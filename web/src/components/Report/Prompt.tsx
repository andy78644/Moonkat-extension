import React, { useEffect } from "react";
import Browser from "webextension-polyfill";
import dataService from "../../dataService";
import Success from "../../assets/reportSuccess.png"

import './Prompt.css'

interface Props {
    name: string,
    description: string,
    contractAddress: string | null,
    userAddress: string | null,
    submit: any,
    onSubmit: any
}

const Prompt = (props: Props) => {
    const getWindowId = async () => {
        return await Browser.windows.getCurrent()
    }
    let reportInfo: string = '';

    useEffect(() => {
        console.log('Prompt Name is: ' + props.name);
        console.log('Prompt Description is: ' + props.description);

        reportInfo += "{"
        reportInfo += `"Provider":"${props.userAddress}",`
        reportInfo += `"Address":"${props.contractAddress}",`
        reportInfo += `"Category":"hi",`
        reportInfo += `"Name":"${props.name}",`
        reportInfo += `"Description":"${props.description}",`
        reportInfo += `"Tag":["a","b","c"]`
        reportInfo += "}"
        reportInfo = JSON.parse(reportInfo)
        console.log(reportInfo)

        const postReport = async (reportInfo: any) => {
            await dataService.postFeedBackByAddress(reportInfo)
                .then(res => {
                    console.log(`Successfully sumbit the report! ${res}`);
                    const windowId = getWindowId()
                    setTimeout(async () => {
                        if (windowId) {
                            Browser.windows.remove((await windowId).id!)
                        }
                    }, 3000)
                })
                .catch((err) => {
                    // todo solve the report fail situation
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
        <dialog id="reportDialog" open={props.submit} onClose={handleClose}>
            <div id="dialogContainer">
                <img src={Success} width="26.67px" height="24px"/>
                <div id="dialogContent">
                    <p style={{fontWeight: 900, fontSize: 16, color: '#434343', margin: 0, marginBottom: 4}}>Report Successfully</p>
                    <p style={{fontSize: 14, color: '#77736A', margin: 0}}>Thanks for your contribution</p>
                </div>
                <form id="dialogButton" method="dialog">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    )
}

export default Prompt;