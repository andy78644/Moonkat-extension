import React from 'react'
import maliciousImage from '../../assets/maliciousImage.png'
import maliciousErrorImage from '../../assets/maliciousErrorImage.png'

import './Malicious.css'

const Malicious = () => {
    return (
        <div id="malicious">
            <img id="maliciousImage" src={maliciousImage} alt="maliciousImage" />
            <div id="maliciousTitle"> 
                <img style={{margin: 0}} id="maliciousCheckImage" src={maliciousErrorImage} alt="maliciousErrorImage" />
                &nbsp; 
                Need Notice !
                May Involve Asset Transfer
            </div>
            <div id="maliciousContent">
                The signature may move your assets.
            </div>
        </div>
    )
}

export default Malicious;