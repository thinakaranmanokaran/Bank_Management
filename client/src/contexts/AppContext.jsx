import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setCurrentUser(decoded);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("token");
                window.location.href = '/signin'; // Use window.location instead
            }
        } else {
            window.location.href === '/signin' ? '' : '/signin' ; // Redirect if no token
        }
    }, []); // Only runs once

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
