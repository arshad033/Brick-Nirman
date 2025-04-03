/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// ✅ Create Context
export const AppContext = createContext();

// ✅ Create Provider Component
export const AppProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sideNavSelect, setSideNavSelect] = useState("Home");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <AppContext.Provider value={{ 
            product, setProduct, 
            isSidebarOpen, setIsSidebarOpen, 
            sideNavSelect, setSideNavSelect, 
            isLoginOpen, setIsLoginOpen, 
            isRegisterOpen, setIsRegisterOpen 
        }}>
            {children}
        </AppContext.Provider>
    );
};
