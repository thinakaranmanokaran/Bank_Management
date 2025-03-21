import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAcc } from "./AccountContext";

const BalanceContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const BalanceProvider = ({ children }) => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);
    const { currentAcc } = useAcc();

    useEffect(() => {
        if (currentAcc?.accountno) {
            const fetchUserAccount = async () => {
                try {
                    const response = await axios.get(`${API_URL}/api/users/balance/${currentAcc.accountno}`);
                    setBalance(response.data.account.balance);
                } catch (err) {
                    setError(err.response?.data?.message || 'Error fetching account details');
                }
            };

            fetchUserAccount();
        }
    }, [currentAcc]);

    return (
        <BalanceContext.Provider value={{ balance, error }}>
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = () => useContext(BalanceContext);
