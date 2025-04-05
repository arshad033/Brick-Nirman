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
    const [user, setUser]=useState(null);
    const [userRegisterData, setUserRegisterData]=useState(null);
    const [isSupplierOpen, setIsSupplierOpen] = useState(false);

    return (
        <AppContext.Provider value={{ 
            product, setProduct, 
            isSidebarOpen, setIsSidebarOpen, 
            sideNavSelect, setSideNavSelect, 
            isLoginOpen, setIsLoginOpen, 
            isRegisterOpen, setIsRegisterOpen,
            user, setUser ,
            userRegisterData, setUserRegisterData,
            isSupplierOpen, setIsSupplierOpen,
        }}>
            {children}
        </AppContext.Provider>
    );
};
