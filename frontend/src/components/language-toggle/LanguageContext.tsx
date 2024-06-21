"use client";
import { createContext, useState } from 'react';

interface ILanguageContext {
  language: string;
  toggleLanguage: (language: String) => void;
}
const LanguageContext = createContext<ILanguageContext>({
  language: 'EN', // Default language
  toggleLanguage: (language: String) => {}, // Placeholder function
});


export const LanguageProvider = ({ children } : {children: any}) => {
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = (language: String) => {
    switch (language) {
      case 'EN':
        setLanguage('EN');
        break;
      case 'NL':
        setLanguage('NL');
        break;
      case 'DE':
        setLanguage('DE');
        break;
      case 'SE':
        setLanguage('SE');
        break;
      case 'IT':
        setLanguage('IT');
        break;
      case 'CHN':
        setLanguage('CHN');
        break;
      default:
        setLanguage('EN');
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;