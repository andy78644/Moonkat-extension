import React from 'react'
import maliciousImage from '../../assets/maliciousImage.png'
import maliciousErrorImage from '../../assets/maliciousErrorImage.png'

import './Malicious.css'

const Malicious = () => {
    return (
        <div id="malicious">
            <img id="maliciousImage" src={maliciousImage} alt="maliciousImage" />
            <div id="maliciousTitle"> 
                <img id="maliciousCheckImage" src={maliciousErrorImage} alt="maliciousErrorImage" />
                &nbsp; 
                Malicious Signature 
            </div>
            <div id="maliciousContent">
                The signature may move your assets.
                It's reported by our community.
            </div>
        </div>
    )
}

export default Malicious;