import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import InfoNavBar from './InfoNavBar';
import Token from './Token';
import Creator from './Creator';
import dataService from '../../dataService';

interface MoreInfo {

}

const MoreInfo = () => {
    const [page, setPage] = useState(0);

    const changePage = (newPage: any) => {
        setPage(newPage)
    }

    return (
        <div>
            <InfoNavBar page={page} onChange={changePage}/>
            { page == 0 && <Token /> }
            { page == 1 && <Creator /> }
        </div>
    );
};

export default MoreInfo;