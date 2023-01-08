import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import InfoNavBar from './InfoNavBar';
import Token from './Token';
import Creator from './Creator';
import dataService from '../../dataService';

interface MoreInfo {

}

const MoreInfo = () => {
    const [isTokenPage, setIsTokenPage] = useState(false);
    return (
        <div>
            <InfoNavBar />
            {
                isTokenPage
                ?
                <div>
                    <Token />
                </div>
                :
                <div>
                    <Creator />
                </div>
            }
        </div>
    );
};

export default MoreInfo;