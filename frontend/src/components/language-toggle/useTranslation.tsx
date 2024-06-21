import { useContext } from 'react';
import LanguageContext from './LanguageContext';
import CHN from './json/chn.json';
import DE from './json/de.json';
import EN from './json/en.json';
import IT from './json/it.json';
import NL from './json/nl.json';
import SE from './json/se.json';

interface Translations {
    EN: { [key: string]: string };
    NL: { [key: string]: string };
    DE: { [key: string]: string };
    SE: { [key: string]: string };
    IT: { [key: string]: string };
    CHN: { [key: string]: string };
    [key: string]: { [key: string]: string }; // Index signature
  }

const translations: Translations = {
  EN,
  NL,
  DE,
  SE,
  IT,
  CHN,
};

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key: string) => {
    const translation = translations[language][key];
    return translation || key;
  };

  return t;
};
