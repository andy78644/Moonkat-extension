export const Identifier = {
    INPAGE: 'ggl-inpage',
    CONTENT_SCRIPT: 'ggl-contentscript',
    METAMASK_INPAGE: 'metamask-inpage',
    METAMASK_CONTENT_SCRIPT: 'metamask-contentscript',
    METAMASK_PROVIDER: 'metamask-provider',
}

export const RequestType = {
    REGULAR: 'regular',
    BYPASS_CHECK: 'bypass-check'
}

// The command to execute the smart contract
export const Signature = {
    approve: 'approve(address,uint256)',
    setApprovalForAll: '	setApprovalForAll(address,bool)',
}

// The command that transfered into opcode to that EVM read
export const SignatureIdentifier = {
    approve: '0x095ea7b3',
    setApprovalForAll:'0xa22cb465',
}

export const EthRPC = '9aa3d95b3bc440fa88ea12eaa4456161'
export const polyApiKey = 'NE2VP5S89SW4TGJSZPCKZHZN2NZ9XKWY4P'