import React from 'react'
import AppRoutes from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { AccProvider, AuthProvider, BalanceProvider } from './contexts'

const App = () => {
    return (
        // <BrowserRouter>
        <AuthProvider>
            <AccProvider>
                <BalanceProvider>
                    <AppRoutes />
                </BalanceProvider>
            </AccProvider>
        </AuthProvider>
        //</BrowserRouter>
    )
}

export default App