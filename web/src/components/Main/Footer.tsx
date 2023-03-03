import React from "react";
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
            <Stack sx={{ width: '100%', backgroundColor: '#DFD8CA', padding: '16px', position: 'fixed', left: 0, bottom: 0 }}
                direction="row"
                spacing='8px'
            >
                <Button sx={{ width: '50%', borderRadius: '48px', borderStyle: 'solid', borderWidth: '2px', color: '#77736A', outlineColor: '#77736A', py: '3px', marginRight: '8px' }}
                    onClick={onReject}
                >
                    Cancel
                </Button>
                <Button sx={{ width: '50%', borderRadius: '48px', color: '#DFD8C9', backgroundColor: '#77736A', py: '3px', marginLeft: '8px' }}
                    onClick={onAccept}
                >
                    Continue
                </Button>
            </Stack>
        </div>
    )
}

export default Footer;