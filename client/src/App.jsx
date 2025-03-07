import React from 'react'
import AppRoutes from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts'

const App = () => {
    return (
       // <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        //</BrowserRouter>
  )
}

export default App