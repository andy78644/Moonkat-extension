import React, {useState, useEffect} from "react";
import Browser from "webextension-polyfill";
import Button from "@mui/material/Button"

interface Props {
    tagState: boolean,
    changeTag: any,
    // productType: any;
    // productAction: any;
}

var windowObj: Browser.Windows.Window;

const Header = (props: Props) => {

    const [reportPopOut, setReportPopOut] = useState(false);
    
    useEffect(() => {
        if (reportPopOut) {
            const createReportPopout = async () => {
                const queryString = new URLSearchParams({})
                const width = 600;
                const height = 480;
                const left = 500;
                const top = 500;
                windowObj = await Browser.windows.create({
                    url: `report.html?${queryString}`,
                    type: 'popup',
                    width,
                    height,
                    left,
                    top
                })
            };
            createReportPopout().then(() => {
                Browser.windows.onRemoved.addListener(() => {
                    setReportPopOut(false)
                })
            }).catch(()=> {
                console.log("Fail to create pop out window!")
            });
        }
    }, [reportPopOut]);

    return (
        <div>
            NFT - MINTING
            <Button onClick={() => setReportPopOut(true)} variant="text">Report</Button> 
            <Button onClick={() => props.changeTag(!props.tagState)} variant="text">MoreTags</Button> 
        </div>
    )
}

export default Header;