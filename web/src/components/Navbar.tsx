import React from "react";
import NavButton from "./NavButton";

type Props = {
    section: any;
    onSection: any;
    onReject: any;
}

const Navbar = (props: Props) => {
    return (
        <div className="flex flex-row gap-1 justify-around">
            <NavButton onClick={() => props.onSection('transfer')}> Transfer </NavButton>
            <NavButton onClick={() => props.onSection('report')}> Report </NavButton>
            <NavButton onClick={() => props.onSection('moreInfo')}> More Info </NavButton>
            <NavButton onClick={() => props.onReject()}> Reject </NavButton>
        </div>
    )
};

export default Navbar;