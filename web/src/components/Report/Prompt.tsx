import React, { useEffect } from "react";
import Browser from "webextension-polyfill";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import dataService from "../../dataService";

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
                    }, 2000)
                })
                .catch((err) => {
                    // todo solve the report fail situation
                    console.log(`Fail to sumbit the report! ${err}`)
                    const windowId = getWindowId()
                    setTimeout(async () => {
                        if (windowId) {
                            Browser.windows.remove((await windowId).id!)
                        }
                    }, 2000)
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
        <div>
            <Dialog
                PaperProps={{ style: { backgroundColor: '#EFE8DB', boxShadow: 'none', } }}
                open={props.submit}
                onClose={handleClose}
                disableEscapeKeyDown={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ mx: 5, color: '#434343', fontSize: 18 }}
                    id="alert-dialog-title">
                    {"Report Submitted!"}
                </DialogTitle>
            </Dialog>
        </div>
    )
}

export default Prompt;