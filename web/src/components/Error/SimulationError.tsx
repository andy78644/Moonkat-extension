import React, { useState } from 'react'
import standingMoonkat from '../../assets/maliciousImage.png'
import warningImage from '../../assets/warning.png'
import discordImage from '../../assets/discord.png'
import twitterImage from '../../assets/twitter.png'

import './SimulationError.css'

const SimulationError = () => {
    return (
        <>
            <div id="simulationError">
                <img id="simulationErrorImage" src={standingMoonkat} alt="standingMoonkat" />
                <div id="simulationErrorTitle">
                    <img id="simulationErrorWarningImage" src={warningImage} alt="warningImage" />
                    &nbsp;
                    Simulated Failed
                </div>
                <div id="simulationErrorContent">
                    Something goes wrong
                    , if the problem still happened
                    , please contact us in discord.
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

export default SimulationError;