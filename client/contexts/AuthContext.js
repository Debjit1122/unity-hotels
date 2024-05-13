import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {
        // Check if token exists in local storage
        const token = localStorage.getItem('token');

        if (token) {
            // Set user data from token
            setUser({ token });
            // Fetch profile information and set it
            fetchProfileInfo(token);
        }
    }, []);

    const fetchProfileInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile information');
            }

            const data = await response.json();
            setProfileInfo(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const login = (userData) => {
        // Authenticate user (e.g., by calling an API)
        setUser({ token: userData.token });
        // Fetch and set profile information upon login
        fetchProfileInfo(userData.token);
        localStorage.setItem('token', userData.token); // Store the token in local storage
    };

    const logout = () => {
        // Logout user
        setUser(null);
        setProfileInfo(null); // Clear profile information
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, profileInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
