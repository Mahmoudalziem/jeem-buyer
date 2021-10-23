import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector'

/// Translation

import translations_en from './assets/locales/en/translations'
import translations_ar from './assets/locales/ar/translations'

i18n
    .use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        defaultNS: ['translations'],
        resources: {
            en: {
                translations: translations_en
            },
            ar: {
                translations: translations_ar
            }
        },
        fallbackLng: 'en',
        react: {
            wait: true,
            useSuspense: false,
        },
        preload: ['en', 'ar'],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;