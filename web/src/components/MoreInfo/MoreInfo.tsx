import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import InfoNavBar from './InfoNavBar';
import Token from './Token';
import Creator from './Creator';
import dataService from '../../dataService';

import './MoreInfo.css'

interface MoreInfo {

}

const MoreInfo = () => {
    const [page, setPage] = useState(0);

    const changePage = (newPage: any) => {
        setPage(newPage)
    }

    return (
        <div id="moreInfo">
            <InfoNavBar page={page} onChange={changePage}/>
            { page == 0 && <Token /> }
            { page == 1 && <Creator /> }
        </div>
    );
};

export default MoreInfo;