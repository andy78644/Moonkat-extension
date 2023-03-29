import React from 'react'
import safeImage from '../../assets/safe.png'
import safeCheckImage from '../../assets/safeCheckImage.png'

import './Safe.css'

const Safe = () => {
    return (
        <div id="safe">
            <img id="safeImage" src={safeImage} alt="safeImage" />
            <div id="safeTitle"> 
                <img id="safeCheckImage" src={safeCheckImage} alt="safeCheckImage" />
                &nbsp; 
                Safe Signature 
            </div>
            <div id="safeContent">
                The signature cannot move your assets.
                It's generally used for signing in.
            </div>
        </div>
    )
}

export default Safe;