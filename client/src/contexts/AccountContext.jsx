import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

const AccountContext = createContext();

export const AccProvider = ({ children }) => {
    const [currentAcc, setcurrentAcc] = useState(null);

    useEffect(() => {
        const accountToken = localStorage.getItem("accountToken");

        if (accountToken) {
            try {
                const decoded = jwtDecode(accountToken);
                setcurrentAcc(decoded);
            } catch (error) {
                console.error("Invalid accountToken", error);
                localStorage.removeItem("accountToken");
                window.location.href = '/signin'; // Use window.location instead
            }
        } else {
            window.location.href === '/signin' ? '' : '/signin' ; // Redirect if no accountToken
        }
    }, []); // Only runs once

    return (
        <AccountContext.Provider value={{ currentAcc }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAcc = () => useContext(AccountContext);
