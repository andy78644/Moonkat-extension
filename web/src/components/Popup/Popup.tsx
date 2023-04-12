import React from 'react';
import ReactDOM from 'react-dom/client';
import Logo from '../../assets/logo.png';
import Twitter from '../../assets/extensionTwitter.png';
import Discord from '../../assets/extensionDiscord.png';
import Contact from '../../assets/extensionContact.png';

// createRoot is an experiment feature so it doesn't have type
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

import './Popup.css';
if (process.env.WORK_ENV === 'prod'|| process.env.WORK_ENV === 'test') {
    console.log = function () {};
}
const Extension = () => {
    return (
        <div>
            <div id="extensionHeader">
                <a href="https://moonkat.io/" target="_blank"><img id="logo" src={Logo} alt="logo" /></a>
                <a href="https://moonkat.io/" target="_blank"><div id="brandName"> MoonKat </div></a>
            </div>
            <div id="extensionContent">
                About Moonkat
                <div id="extensionImages">
                    <a href="https://twitter.com/Moonkat_io" target="_blank"><img id="twitter" className="extensionImage" src={Twitter} alt="Twitter" /></a>
                    <a href="https://discord.gg/MVtNANcRRP" target="_blank"><img id="discord" className="extensionImage" src={Discord} alt="Discord" /></a>
                    <a href="https://tally.so/r/w4QLG5" target="_blank"><img id="contact" className="extensionImage" src={Contact} alt="Contact" /></a>
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