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
        }, 2000)
    }, [props.submit])
    const handleClose = async () => {
        const windowId = getWindowId()
        props.onSubmit(false)
        Browser.windows.remove((await windowId).id!)
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