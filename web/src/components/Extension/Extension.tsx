import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Logo from '../../assets/logo.png';
import Twitter from '../../assets/extensionTwitter.png';
import Discord from '../../assets/extensionDiscord.png';
import Contact from '../../assets/extensionContact.png';

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

import './Extension.css';

const Extension = () => {
    return (
        <div>
            <div id="extensionHeader">
                <img id="logo" src={Logo} alt="logo" />
                <div id="brandName"> MoonKat </div>
            </div>
            <div id="extensionContent">
                About Moonkat
                <div id="extensionImages">
                    <a href="https://twitter.com/Moonkat_io" target="_blank"><img id="twitter" className="extensionImage" src={Twitter} alt="Twitter" /></a>
                    <a href="https://discord.gg/pK5bUfB2" target="_blank"><img id="discord" className="extensionImage" src={Discord} alt="Discord" /></a>
                    <a href="https://www.youtube.com/watch?v=mx86-rTclzA" target="_blank"><img id="contact" className="extensionImage" src={Contact} alt="Contact" /></a>
                </div>
                <div id="extensionImagesDescription">
                    <div>Twitter</div>
                    <div>Discord</div>
                    <div>Contact</div>
                </div>
            </div>
        </div>

    )
}

root.render(
    <Extension />
);

export default Extension;