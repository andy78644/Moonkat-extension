import React, {useState} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import './Footer.css';

interface Props {
    onAccept: any;
    onReject: any;
};

const Footer = (props: Props) => {
    const { onAccept, onReject } = props;
    return (
        <div>
            <Stack sx={{
                width: '100%',
                backgroundColor: '#FFF8EA',
                marginTop: '16px',
                padding: '16px'
            }}
                direction="row"
                spacing='8px'
            >
                <Button sx={{
                    width: '50%',
                    borderRadius: '48px',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    color: '#77736A',
                    outlineColor: '#77736A',
                    padding: '6px',
                }}
                    onClick={onReject}
                    >
                    Cancel
                </Button>
                <Button sx={{
                    width: '50%',
                    borderRadius: '48px',
                    color: '#DFD8C9',
                    backgroundColor: '#77736A',
                    padding: '6px',
                }}
                    onClick={onAccept}
                >
                    Continue
                </Button>
            </Stack>
        </div>
    )
}

export default Footer;