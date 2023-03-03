import React from 'react'
import standingMoonkat from '../../assets/maliciousImage.png'
import warningImage from '../../assets/warning.png'
import discordImage from '../../assets/discord.png'
import twitterImage from '../../assets/twitter.png'

import './SignatureError.css'

const SignatureError = () => {
    return (
        <>
            <div id="signatureError">
                <img id="signatureErrorImage" src={standingMoonkat} alt="standingMoonkat" />
                <div id="signatureErrorTitle">
                    <img id="signatureErrorWarningImage" src={warningImage} alt="warningImage" />
                    &nbsp;
                    Couldn't decode the message
                </div>
                <div id="signatureErrorContent">
                    Please make sure it's a safe website/contract
                    before signing this signature.
                    If you'd like to support us about the contract,
                    please don't hesitate to contact us in discord!
                </div>
            </div>
            <div id="contact">
                <a href="https://discord.gg/NAbG3GDa" target='_blank'>
                    <img id="discordImage" className="contactButton" src={discordImage} alt="discordImage" />
                </a>
                <a href="https://twitter.com/Moonkat_io" target='_blank'>
                    <img id="twitterImage" className="contactButton" src={twitterImage} alt="twitterImage" />
                </a>
            </div>
        </>
    )
}

export default SignatureError;