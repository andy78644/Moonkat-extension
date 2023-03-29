import React from "react"
import { Component } from "./Component/Component";
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string
        }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string
        }
    }
}
interface Props {
    assetsIn: Array<any>
    assetsOut: Array<any>
    gas: string
    gasPrice: string
}

const themeForSend = createTheme({
    palette: {
        secondary: {
            main: '#B8463D',
        }
    },
});

const themeForReceive = createTheme({
    palette: {
        secondary: {
            main: '#509A57',
        }
    },
});

const Change = (props: Props) => {
    const { assetsIn, assetsOut, gas, gasPrice } = props
    const gasFee = parseInt(gas, 16) * parseInt(gasPrice) * 10 ** (-9)
    // console.log("[Change.tsx]: GasFee is: ", gasFee)
    return (
        <>
            <ThemeProvider theme={themeForSend}>
                <Component sendTokens={assetsOut} gasFee={gasFee} mode="Assets Send" />
            </ThemeProvider>
            <ThemeProvider theme={themeForReceive}>
                <Component sendTokens={assetsIn} gasFee={0} mode="Assets Receive" />
            </ThemeProvider>
        </>
        
    )
}

export default Change