import React,{useState} from 'react';

import PlanetImage from '../images/planet.png';
import Avatar01 from '../images/avator_1.jpeg';
import Avatar02 from '../images/avator_2.jpeg';
import Avatar03 from '../images/avator_3.jpeg';
import PlanetAvatar04 from '../images/planet-avatar-04.png';
import PlanetAvatar05 from '../images/planet-avatar-05.png';
import { useTranslation } from 'react-i18next';
import ModalBasic from '../utils/ModalBasic';
function HeroWord() {
  const { t, i18n } = useTranslation();
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [basicModalType, setBasicModalContent] = useState("China"|"Philippines"|"Russia");
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 ">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">{t('Hero World Title')}</h1>
            <p className="text-xl text-gray-600">{t('Hero World Sub Title')}</p>
          </div>

          {/* World illustration */}
          <div className="flex flex-col items-center pt-16 pb-12 md:pt-20 md:pb-16">
            <div className="relative">
              {/* Halo effect */}
              <svg className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" width="800" height="800" viewBox="0 0 800 800" style={{ maxWidth: '200%' }} xmlns="http://www.w3.org/2000/svg">
                <g className="fill-current text-gray-400 opacity-75">
                  <circle className="pulse" cx="400" cy="400" r="200" />
                  <circle className="pulse pulse-1" cx="400" cy="400" r="200" />
                  <circle className="pulse pulse-2" cx="400" cy="400" r="200" />
                </g>
              </svg>
              {/* White box */}
              {/* <svg className="absolute w-32 h-auto rounded-full shadow-xl" viewBox="0 0 128 48" style={{ width: '32%', top: '20%', right: '-16%' }} xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-white" width="128" height="48" rx="24" />
              </svg> */}
              {/* Globe image */}
              <img className="relative rounded-full shadow-xl" src={PlanetImage} width="400" height="400" alt="Planet" />
              {/* Static dots */}
              <svg className="absolute top-0 w-full h-auto" viewBox="0 0 400 400" style={{ left: '12%' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter x="-41.7%" y="-34.2%" width="183.3%" height="185.6%" filterUnits="objectBoundingBox" id="world-ill-a">
                    <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.439215686 0 0 0 0 0.956862745 0 0 0 0.32 0" in="shadowBlurOuter1" />
                  </filter>
                  <filter x="-83.3%" y="-68.5%" width="266.7%" height="271.2%" filterUnits="objectBoundingBox" id="world-ill-c">
                    <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.439215686 0 0 0 0 0.956862745 0 0 0 0.32 0" in="shadowBlurOuter1" />
                  </filter>
                  <filter x="-7.3%" y="-23.8%" width="114.5%" height="147.6%" filterUnits="objectBoundingBox" id="world-ill-e">
                    <feGaussianBlur stdDeviation="2" in="SourceGraphic" />
                  </filter>
                  <ellipse id="world-ill-b" cx="51" cy="275.402" rx="24" ry="23.364" />
                  <ellipse id="world-ill-d" cx="246" cy="256.201" rx="12" ry="11.682" />
                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="world-ill-f">
                    <stop stopColor="#0070F4" stopOpacity="0" offset="0%" />
                    <stop stopColor="#0070F4" stopOpacity=".64" offset="52.449%" />
                    <stop stopColor="#0070F4" stopOpacity="0" offset="100%" />
                  </linearGradient>
                </defs>
                <g transform="translate(0 -.818)" fill="none" fillRule="evenodd">
                  <use fill="#000" filter="url(#world-ill-a)" xlinkHref="#world-ill-b" />
                  <use fill="#0070F4" xlinkHref="#world-ill-b" />
                  <use fill="#000" filter="url(#world-ill-c)" xlinkHref="#world-ill-d" />
                  <use fill="#0070F4" xlinkHref="#world-ill-d" />
                  <ellipse fillOpacity=".32" fill="#0070F4" cx="293" cy="142.303" rx="8" ry="7.788" />
                  <ellipse fillOpacity=".64" fill="#0070F4" cx="250" cy="187.083" rx="6" ry="5.841" />
                  <ellipse fillOpacity=".64" fill="#0070F4" cx="13" cy="233.811" rx="2" ry="1.947" />
                  <ellipse fill="#0070F4" cx="29" cy="114.072" rx="2" ry="1.947" />
                  <path d="M258 256.2l87-29.204" stroke="#666" strokeWidth="2" opacity=".16" filter="url(#world-ill-e)" />
                  <path d="M258 251.333c111.333-40.237 141-75.282 89-105.136M136 103.364c66.667 4.543 104.667 32.45 114 83.72" stroke="url(#world-ill-f)" strokeWidth="2" strokeDasharray="2" />
                </g>
              </svg>
              {/* Dynamic dots */}
              <svg className="absolute max-w-full" width="48" height="48" viewBox="0 0 48 48" style={{ width: '12%', top: '45%', left: '50%' }} xmlns="http://www.w3.org/2000/svg">
                <g className="fill-current text-blue-600">
                  <circle className="pulse pulse-mini pulse-1" cx="24" cy="24" r="8" />
                  <circle className="pulse pulse-mini pulse-2" cx="24" cy="24" r="8" />
                  <circle cx="24" cy="24" r="8" />
                </g>
              </svg>
              <svg className="absolute max-w-full" width="48" height="48" viewBox="0 0 48 48" style={{ width: '12%', top: '19%', left: '46%' }} xmlns="http://www.w3.org/2000/svg">
                <g className="fill-current text-blue-600">
                  <circle className="pulse pulse-mini" cx="24" cy="24" r="8" />
                  <circle className="pulse pulse-mini pulse-2" cx="24" cy="24" r="8" />
                  <circle cx="24" cy="24" r="8" />
                </g>
              </svg>
              {/* Avatars 菲律宾*/}
              <div className="absolute max-w-full transform animate-float w-1/6" style={{  top: '90.5%', left: '6.8%' }} >
                
                <img  src={Avatar01} className="w-10 rounded-full" alt="Planet avatar 03"  />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 left-5 h-6 w-6 text-red-700 animate-pulse transition duration-75  flex md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={(e) => { e.preventDefault(); e.stopPropagation();setBasicModalContent("Philippines"); setBasicModalOpen(true) }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className='inline-flex text-left text-gray-100 py-1 px-3 rounded-full bg-red-600 hover:bg-red-700 transition duration-150 ease-in-out -ml-48 hidden md:flex'>
                {t("Philippines Title")+t("Philippines Content")}
                </span>
              </div>
              {/* Avatars 中国*/}
              <div className="absolute max-w-full transform animate-float w-full" style={{  top: '60.5%', left: '60.8%' }}>
                
                <img  src={Avatar02} className="w-10 rounded-full" alt="Planet avatar 03" />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 left-5 h-6 w-6 text-purple-700 animate-pulse   flex md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={(e) => { e.preventDefault(); e.stopPropagation();setBasicModalContent("China"); setBasicModalOpen(true) }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className='inline-flex text-left text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out  hidden md:flex'>
                {t("China Title")+t("China Content")}
                </span>
              </div>
              {/* Avatars 俄罗斯*/}
              <div className="absolute max-w-full transform animate-float w-full" style={{  top: '10.5%', left: '70.8%' }}>
                <span className='inline-flex text-left text-gray-100 py-1 px-3 rounded-full bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out  hidden md:flex'>
                {t("Russia Title")+t("Russia Content")}
                </span>
                <img  src={Avatar03} className="w-10 rounded-full" alt="Planet avatar 03" />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 left-5 h-6 w-6 text-green-700 animate-pulse transition duration-75  flex md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={(e) => { e.preventDefault(); e.stopPropagation();setBasicModalContent("Russia"); setBasicModalOpen(true) }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              
            </div>
          </div>

          

        </div>
        <ModalBasic id="basic-modal" modalOpen={basicModalOpen} setModalOpen={setBasicModalOpen} title={t(basicModalType+" Title")}>
          {/* Modal content */}
          <div className="px-5 pt-4 pb-1">
            <div className="text-sm">
              <div className="font-medium text-slate-800 mb-2"></div>
              <div className="space-y-2">
                <p>{t(basicModalType+" Content")}</p>
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4">
            <div className="flex flex-wrap justify-end space-x-2">
              {/* <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setBasicModalOpen(false); }}>Close</button> */}
              {/* <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">I Understand</button> */}
            </div>
          </div>
        </ModalBasic>
      </div>
    </section>
  );
}

export default HeroWord;