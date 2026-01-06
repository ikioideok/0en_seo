import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tokutei from './Tokutei.tsx'
import Privacy from './Privacy.tsx'
import AdminChat from './AdminChat.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/tokutei" element={<Tokutei />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/admin" element={<AdminChat />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
