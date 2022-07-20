import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_cht from './cht.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "Connect wallet": "Connect wallet",
      "Connected wallet address":"Connected wallet address",
      "Account":"Account",
      "Details":"Details",
      "Copy":"Copy",
      "Log out":"Log out",
      "Copy successfully":"Copy successfully",
      "Open app":"Open app",
      "Home Tile":"Put your idle assets to work",
      "Home Sub Tile":"Keen Finance is a next-generation micro-transaction platform that makes trading easy and lucrative. Our goal is to be the best place for everyone to trade and make money.",
      "Learn more":"Learn more",
      "Hero World Title":"Developing a global mindset",
      "Hero World Sub Title":"Users from all over the world are joining us, they are from Russia, China, Laos, Thailand, Vietnam...",
      "China Title":"🇨🇳 Liu Guofu：",
      "Philippines Title":"🇵🇭 Mark John Sanchez：",
      "Russia Title":"🇨🇷 Anton Gerashchenko：",
      "China Content":"Keen, let my TCP be resurrected.",
      "Philippines Content":"Since having the Keen platform, he has increased my income a lot.",
      "Russia Content":"There is no reward in the world to encourage hard work, all rewards are only used to reward the results of work.",
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  },
  cht: {
    translation: translation_cht
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "cht", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;