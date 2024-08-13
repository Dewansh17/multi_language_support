import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const translations = {
    en: require('../translations/en.json'),
    es: require('../translations/es.json'),
    hi: require('../translations/hi.json'),
    pt: require('../translations/pt.json'),
    zh: require('../translations/zh.json'),
    fr: require('../translations/fr.json')
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [background, setBackground] = useState('white');
    const [translation, setTranslation] = useState(translations['en']);

    useEffect(() => {
        setTranslation(translations[language]);
        switch (language) {
            case 'hi':
                setBackground('blue');
                break;
            case 'zh':
                setBackground('green');
                break;
            case 'fr':
                setBackground('yellow');
                break;
            default:
                setBackground('white');
        }
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translation, background }}>
            {children}
        </LanguageContext.Provider>
    );
};
