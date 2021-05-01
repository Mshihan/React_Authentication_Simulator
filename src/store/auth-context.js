import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogIn: (username, password) => { },
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn])


    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', '0');
        setIsLoggedIn(false);
    };


    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogIn: loginHandler,
    }}>
        {props.children}
    </AuthContext.Provider>
}




export default AuthContext;