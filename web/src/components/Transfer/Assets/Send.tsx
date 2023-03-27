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
    sendTokens: Array<any>
    gas: string
    gasPrice: string
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#B8463D',
        }
    },
});

const Send = (props: Props) => {
    const { sendTokens, gas, gasPrice } = props
    const gasFee = parseInt(gas, 16) * parseInt(gasPrice) * 10 ** (-9)
    return (
        <ThemeProvider theme={theme}>
            <Component sendTokens={sendTokens} gasFee={gasFee} mode="Assets Send" />
        </ThemeProvider>
    )
}

export default Send