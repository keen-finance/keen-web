import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../utils/Dropdown';
import ModalBasic from '../utils/ModalBasic';
import MM from "../images/blockchian/mm.png"
import CBW from "../images/blockchian/cbw.png"
import WC from "../images/blockchian/wc.png"
import TP from "../images/blockchian/tp.png"
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Logo from "../images/logo/logo.jpg"
import { loadLanguages } from 'i18next';
import CN from "../images/flags/cn.svg"
import GB from "../images/flags/gb.svg"
import HK from "../images/flags/hk.svg"
import JP from "../images/flags/jp.svg"
import KR from "../images/flags/kr.svg"
import PH from "../images/flags/ph.svg"
import RU from "../images/flags/ru.svg"
import VN from "../images/flags/vn.svg"

function Header() {
  const { t, i18n } = useTranslation();

  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const [connectModalOpen, setConnectModalOpen] = useState(false);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  useEffect(() => {
    
    console.log("error",error)
  },[error]);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}...${match[2]}`;
  };

  // useEffect(() => {
  //   const provider = window.localStorage.getItem("provider");
  //   if (provider) activate(connectors[provider]);
  // }, []);

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);

  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  return (
    <div className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="flex" aria-label="Cruip">
              <img src={Logo} alt="" className="w-8 h-8 "/>
              <span className='text-2xl font-medium ml-2 hidden md:flex'>Keen Finace</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <a href="https://medium.com/@keen.finance/test-5c3d670fc962" target={"_blank"} className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  {t('header.token_economics')}
                </a>
              </li>
              {/* <li>
                <Link to="/pricing" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">Pricing</Link>
              </li> */}
              <li>
                <a href="https://medium.com/@keen.finance" target={"_blank"} className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                {t('header.blog')}
                </a>
              </li>
              {/* <li>
                <Link to="/about" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">About us</Link>
              </li> */}
              {/* 1st level: hover */}
 
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <Dropdown title={''} icon='language'>
                <li onClick={() => {
                  i18next.changeLanguage('cht')
                }}>
                  <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer" >
                    <img src={CN} alt="" className='w-4 mr-2' />
                    中文
                  </div>
                </li>
                <li onClick={() => {
                  i18next.changeLanguage('en')
                }}>
                  <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                    <img src={GB} alt="" className='w-4 mr-2' />
                    English
                  </div>
                </li>
                <li onClick={() => {
                  i18next.changeLanguage('cht')
                }}>
                  <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                    <img src={HK} alt="" className='w-4 mr-2' />
                    中文繁體
                  </div>
                </li>
                <li onClick={() => {
                  i18next.changeLanguage('en')
                }}>
                  <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                    <img src={JP} alt="" className='w-4 mr-2' />
                    日本
                  </div>
                </li>
                
              </Dropdown>
              <li >
                <Link to="/trade" className="font-medium w-full inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-4 py-2 my-2 rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out">
                {t("header.open_app")}
                </Link>
              </li>
              
            </ul>

          </nav>

            
          <div className='flex flex-nowarp md:hidden'>
            {/* Mobile language */}
            <nav  >
              <ul>
                <Dropdown title={''} icon='language'>
                    <li onClick={() => {
                      i18next.changeLanguage('cht')
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer" >
                        <img src={CN} alt="" className='w-4 mr-2' />
                        中文
                      </div>
                    </li>
                    <li onClick={() => {
                      i18next.changeLanguage('en')
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                        <img src={GB} alt="" className='w-4 mr-2' />
                        English
                      </div>
                    </li>
                    <li onClick={() => {
                      i18next.changeLanguage('cht')
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                        <img src={HK} alt="" className='w-4 mr-2' />
                        中文繁體
                      </div>
                    </li>
                    <li onClick={() => {
                      i18next.changeLanguage('en')
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                        <img src={JP} alt="" className='w-4 mr-2' />
                        日本
                      </div>
                    </li>
                    
                </Dropdown>
              </ul>
            
            </nav>
            {/* Mobile menu */}
            <div >

              {/* Hamburger button */}
              
              <button ref={trigger} className={`my-2 hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                <span className="sr-only">Menu</span>
                <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect y="4" width="24" height="2" rx="1" />
                  <rect y="11" width="24" height="2" rx="1" />
                  <rect y="18" width="24" height="2" rx="1" />
                </svg>
              </button>

              {/*Mobile navigation */}
              <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 } }>
                <ul className="bg-gray-800 px-4 py-2">
                  <li>
                    <a href="https://medium.com/@keen.finance/test-5c3d670fc962" className="flex text-gray-300 hover:text-gray-200 py-2  ml-2">{t('header.token_economics')}</a>
                  </li>
                  <li>
                    <a href="https://medium.com/@keen.finance" className="flex text-gray-300 hover:text-gray-200 py-2  ml-2">{t('header.blog')}</a>
                  </li>
                  {/* <li>
                    <Link to="/blog" className="flex text-gray-300 hover:text-gray-200 py-2">Blog</Link>
                  </li>
                  <li>
                    <Link to="/about" className="flex text-gray-300 hover:text-gray-200 py-2">About us</Link>
                  </li>
                  <li className="py-2 my-2 border-t border-b border-gray-700">
                    <span className="flex text-gray-300 py-2">Support</span>
                    <ul className="pl-4">
                      <li>
                        <Link to="/contact" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Contact us</Link>
                      </li>
                      <li>
                        <Link to="/help" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">Help center</Link>
                      </li>
                      <li>
                        <Link to="/404" className="text-sm flex font-medium text-gray-400 hover:text-gray-200 py-2">404</Link>
                      </li>
                    </ul>
                  </li> */}
                  {/* <li>
                    <Link to="/signin" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center">Sign in</Link>
                  </li> */}
                  <li >
                    <Link to="/trade" className="font-medium w-full inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-4 py-2 my-2 rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out">
                    {t("header.open_app")}
                    </Link>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Header;
