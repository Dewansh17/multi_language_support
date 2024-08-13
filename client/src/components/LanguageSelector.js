import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSelector = () => {
    const { language, setLanguage } = useContext(LanguageContext);

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <select value={language} onChange={handleChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="pt">Portuguese</option>
            <option value="zh">Chinese</option>
            <option value="fr">French</option>
        </select>
    );
};

export default LanguageSelector;
