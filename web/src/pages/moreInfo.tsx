import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import dataService from '../dataService';


export const MoreInfo = () =>{
    return (
        <div> Cool More Info</div>
    );
};

ReactDom.render(
    <React.StrictMode>
        <MoreInfo/>
    </React.StrictMode>,
    document.getElementById('root')
);