import { createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [userProfile, setUserProfile] = useState(null);

    const clearUser = () => {
        setUserProfile(null);
    }

    const contextValue = {
        userProfile,
        setUserProfile,
        clearUser
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;