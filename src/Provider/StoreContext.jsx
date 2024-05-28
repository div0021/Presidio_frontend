import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"

const StoreContext = createContext();

export const StoreProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);   

    const addCurrentUser = (user)=>{
        setCurrentUser(user);
    }

    const removeCurrentUser = () => {
        setCurrentUser(null);
    }

    return (
        <StoreContext.Provider value={{currentUser,addCurrentUser,removeCurrentUser}}>
        {children}

        </StoreContext.Provider>
    )
}

StoreProvider.propTypes = {
    children:PropTypes.node.isRequired
}

export const useStore = () => {
    return useContext(StoreContext);
}