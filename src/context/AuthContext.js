import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            // Implement login API call
            const response = await axios.post('http://localhost:8000/api/login', userData);
            setUser(response.data.user);
            localStorage.setItem('user-token', response.data.access_token);
            localStorage.setItem('username', response.data.user.name);
            localStorage.setItem('user_id', response.data.user.id);
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
        }
    };

    const register = async (userData) => {
        try {
            // Implement register API call
            const response = await axios.post('http://localhost:8000/api/register', userData);
            setUser(response.data.user);
            localStorage.setItem('user-token', response.data.access_token);
            localStorage.setItem('username', response.data.user.name);
            localStorage.setItem('user_id', response.data.user.id);
        } catch (error) {
            // Handle register error
            console.error('Register error:', error);
        }
    };

    const logout = () => {
        // Implement logout API call
        debugger;
        setUser(null);
        localStorage.removeItem('user-token');
        debugger;
        localStorage.removeItem('username');
        debugger;
        localStorage.removeItem('user_id');
        debugger;
    };

    useEffect(() => {
        // Check authentication status on component mount
        const checkAuthStatus = async () => {
            const accessToken = localStorage.getItem('user-token');
            const userID = localStorage.getItem('user_id');
            if (accessToken) {
                // Implement API call to check if the user is authenticated
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    const response = await axios.get(`http://localhost:8000/api/user/${userID}`);
                    setUser(response.data.user);
                } catch (error) {
                    // Handle authentication check error
                    console.error('Authentication check error:', error);
                }
            }
        };

        checkAuthStatus();
    }, []);

    const contextValue = {
        user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
