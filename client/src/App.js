import React, { useContext, useEffect } from 'react';
import './App.css';
import LanguageSelector from './components/LanguageSelector';
import Auth from './components/Auth';
import { LanguageContext, LanguageProvider } from './contexts/LanguageContext';

const App = () => {
    const { translation, background } = useContext(LanguageContext);

    useEffect(() => {
        document.body.style.backgroundColor = background;
    }, [background]);

    return (
        <div className="App">
            <h1>{translation.welcome}</h1>
            <LanguageSelector />
            <Auth />
        </div>
    );
};

const WrappedApp = () => (
    <LanguageProvider>
        <App />
    </LanguageProvider>
);

export default WrappedApp;
