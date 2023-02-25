import React, { useEffect } from "react";
import Browser from "webextension-polyfill";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    submit: any,
    onSubmit: any
}
// const handleReturn = async () => {
//     setOpen(false)
//     props.onSubmit(false)
// }
const Prompt = (props: Props) => {
    const getWindowId = async () => {
        return await Browser.windows.getCurrent()
    }
    // Submitted -> Continue transaction
    useEffect(() => {
        // execute it after 2000 ms of the submit -> true
        const windowId = getWindowId()
        setTimeout(async () => {
            if (windowId){
                const data = true
                Browser.runtime.sendMessage((await windowId).id!, { windowId, data});
                window.close()}
        }, 2000)
    }, [props.submit])
    const handleClose = async () => {
        const windowId = getWindowId()
        props.onSubmit(false)
        // Browser.windows.remove((await windowId).id!)
        const data = true
        Browser.runtime.sendMessage((await windowId).id!, { windowId, data});
        window.close()
    };
    return (
        <div>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: '#EFE8DB',
                        boxShadow: 'none',
                    },
                }}
                open={props.submit}
                onClose={handleClose}
                disableEscapeKeyDown={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{
                    mx: 5,
                    color: '#434343',
                    fontSize: 18,
                }}
                id="alert-dialog-title">
                {"Report Submitted!"}
                </DialogTitle>
            </Dialog>
        </div>
    )
}

export default Prompt;