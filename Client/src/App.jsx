import React, { useContext } from 'react'
import { AppContext } from './context/AppContext';

function App() {
  const { user, setUser, theme, setTheme } = useContext(AppContext);

    return (
        <div>
            <h1 >Theme: {theme}</h1>
            <button className="py-2 px-4 rounded-md bg-blue-400" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                Toggle Theme
            </button>

            <h2>User: {user}</h2>
            <button onClick={() => setUser("Kumar")}>
                Change User
            </button>
        </div>
    );
}

export default App