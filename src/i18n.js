import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      "Connect wallet": "連接錢包",
      "Connected wallet address":"連接的錢包地址",
      "Account":"賬號",
      "Details":"詳細信息",
      "Log out":"登出",
      "Copy successfully":"複製成功",
      "Open app":"打開應用",
      "Home Tile":"讓您的閒置資產發揮作用",
      "Home Sub Tile":"Keen Finance 是下一代微交易平台，讓交易變得輕鬆而有利可圖。 我們的目標是成為每個人交易和賺錢的最佳場所。",
      "Learn more":"瞭解更多",
      "Hero World Title":"培養全球思維",
      "Hero World Sub Title":"來自世界各地的用戶正在加入我們，他們來自俄羅斯、中國、老撾、泰國、越南……",
      "China Title":"🇨🇳 劉國福：",
      "Philippines Title":"🇵🇭 馬克·約翰·桑切斯：",
      "Russia Title":"🇨🇷 安东·格拉申科：",
      "China Content":"Keen，讓我的TCP，重新復活了。",
      "Philippines Content":"自從有了Keen這個平台，他讓我的收益上升了很多。",
      "Russia Content":"世上並沒有用來鼓勵工作努力的賞賜，所有的賞賜都只是被用來獎勵工作成果的。",
      "Step Title":"只需幾步即可開始交易",
      "Step SubTitle":"成為交易員並在 Keen Finance 上賺錢既快捷又容易。",
      "Step One Title":"創建錢包",
      "Step One SubTitle":"使用Token Pocket、MeteMask創建錢包，成為一名優秀的區塊鏈交易者",
      "Step Two Title":"購買數字貨幣",
      "Step Two SubTitle":"在幣安交易所或其他交易所購買礦工費代幣：BNB，交易代幣：USDT、TCP。",
      "Step Three Title":"開始交易",
      "Step Three SubTitle":"進行交易並賺錢利潤，賺取交易獎勵代幣。",
      "News One Title":"Keen 代幣",
      "News One SubTitle":"$Keen 是 Keen Finance 的核心。它使您可以利用我們平台的成長和成功。",
      "News One Btn":"探索代幣",
      "News Two Title":"Keen Finance",
      "News Two SubTitle":"更好的交易和賺錢方式，支持使用USDT、TCP交易賺取利潤。",
      "News Two Btn":"探索交易",
      "Token Economics":"代幣經濟學",
      "Blog":"博客",
    }
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