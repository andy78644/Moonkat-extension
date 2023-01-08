import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import TagBar from '../MoreTags/TagBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReportForm from './ReportForm';


const Report = () =>{
    return (
        <div>
            <div>
                Report Contract
            </div>
            <ReportForm />
            <div>
                This is a malicious contract
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button> 
                <Button variant="contained">Contained</Button>
            </Stack>
            <div>
                More related tags about the contract
            </div>
            <Button variant="text">AddTags</Button>
            <TagBar />
            <div>
                More detail about the contract
            </div>
            <ReportForm />
            <Button variant="text">Send</Button>
        </div>
    );
};

export default Report;