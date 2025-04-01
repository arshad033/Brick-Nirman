/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// ✅ Create Context
export const AppContext = createContext();

// ✅ Create Provider Component
export const AppProvider = ({ children }) => {
    const [product, setProduct] = useState(null);       // State Example
    const [theme, setTheme] = useState("light");  // Another State Example
    
    return (
        <AppContext.Provider value={{ product, setProduct, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};


