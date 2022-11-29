import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import dataService from '../dataService';


export const Report = () =>{
    return (
        <div> Cool Report</div>
    );
};

ReactDom.render(
    <React.StrictMode>
        <Report/>
    </React.StrictMode>,
    document.getElementById('root')
);