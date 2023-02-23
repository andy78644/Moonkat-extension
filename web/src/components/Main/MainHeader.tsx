import React, { useState } from 'react';

import './MainHeader.css';

const MainHeader = () => {
    return (
        <div id="mainHeader">
            <img id="logo" src={require('../../assets/logo.png').default} alt="logo" />
            <div id="brandName"> MoonKat </div>
        </div>
    )
};

export default MainHeader;