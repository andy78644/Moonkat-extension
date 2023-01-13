import React, {useState, useEffect} from "react";
import Browser from "webextension-polyfill";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    submit: any,
    onSubmit: any
}

const Prompt = (props: Props) => {
    // const handleReturn = async () => {
    //     setOpen(false)
    //     props.onSubmit(false)
    // }
    const getWindowId = async () => {
        return await Browser.windows.getCurrent()
    }
    useEffect(() => {
        const windowId = getWindowId()
        setTimeout(async () => {
            if (windowId) 
                Browser.windows.remove((await windowId).id!)
        }, 1000)
    }, [props.submit])
    const handleClose = async () => {
        const windowId = getWindowId()
        props.onSubmit(false)
        Browser.windows.remove((await windowId).id!)
    };
    return (
        <div>
            <Dialog
                open={props.submit}
                onClose={handleClose}
                disableEscapeKeyDown={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Report Submitted!"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {/* Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running. */}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                {/* <Button onClick={handleReturn}>Back</Button>
                <Button onClick={handleClose} autoFocus>
                    Send
                </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Prompt;