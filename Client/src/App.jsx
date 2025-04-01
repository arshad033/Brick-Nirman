import React from 'react'
import { AppContext } from './context/AppContext';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {

    return (
        <div className="overflow-x-hidden bg-gray-900">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App