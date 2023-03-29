import React from "react";

import './TransferHeader.css'

interface Props {
    mode: string;
}

const TransferHeader = (props: Props) => {
    const { mode } = props
    return (
        <div id="transferHeader">
            <div id="headerChange"> Change will be made by {
                mode.split('-')[0] === "transaction" ?
                "accepting txn" :
                "signing signature"
            } </div>
        </div>
    )
}

export default TransferHeader;