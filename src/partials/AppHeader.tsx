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
import Logo from "../images/logo/logo.jpg"
import CN from "../images/flags/cn.svg"
import GB from "../images/flags/gb.svg"
import HK from "../images/flags/hk.svg"
import JP from "../images/flags/jp.svg"
import KR from "../images/flags/kr.svg"
import PH from "../images/flags/ph.svg"
import RU from "../images/flags/ru.svg"
import VN from "../images/flags/vn.svg"
import i18next from 'i18next';
import {IERC20} from "../types"
import IERC20JSON from '../artifacts/contracts/KeenRouter.sol/IERC20.json'
import { BigNumber, ethers } from "ethers";

function AppHeader(props) {
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
    
    const provider = library && new ethers.providers.Web3Provider(window.ethereum);
    if(!provider){
      return;
    }
    const signer = provider.getSigner();
    const token = new ethers.Contract("0x3fa38E76EEBF9192D47f723B0D41b2CeFaC4275A", IERC20JSON.abi, signer) as IERC20;
    console.log("token",token)

    token.name().then(console.log)
  },[library]);

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

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);

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
              <img src={Logo} alt="" className="w-8 h-8"/>
              <span className='text-2xl font-mono font-medium ml-2  hidden md:flex'>Keen Finace</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link  to="/trade" className={`text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out ${props.current == 'trade' && 'cursor-default text-purple-700 hover:text-purple-800'}`}>
                  {t('header.trade')}
                </Link>
              </li>
              {/* <li>
                <Link to="/pricing" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">Pricing</Link>
              </li> */}
              <li>
                <Link to="/trade-pool" className={`text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out ${props.current == 'trade_pool' && 'cursor-default text-purple-700 hover:text-purple-800'}`}>
                {t('header.cap_pool')}
                </Link>
              </li>
              {/* <li>
                <Link to="/about" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">About us</Link>
              </li> */}
              {/* 1st level: hover */}
              <Dropdown title={(t("header.language"))}>
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

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li >
                {
                  !active ? (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConnectModalOpen(true); }}  className="font-medium w-full inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-4 py-1 my-2 rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out">
                    <div className='z-10 p-1 border border-purple-600 rounded-full  mr-2'>
                      <svg t="1658332020519" className=" w-4 h-4 fill-purple-600 text-white-300 hover:fill-white-200 transition duration-150 ease-in-out " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3154" >
                        <path  d="M922.4 256H160c-17.68 0-32-14.32-32-32s14.32-32 32-32h768c17.68 0 32-14.32 32-32 0-53.02-42.98-96-96-96H128C57.3 64 0 121.3 0 192v640c0 70.7 57.3 128 128 128h794.4c56.04 0 101.6-43.06 101.6-96V352c0-52.94-45.56-96-101.6-96zM832 672c-35.34 0-64-28.66-64-64s28.66-64 64-64 64 28.66 64 64-28.66 64-64 64z" p-id="3155"></path>
                      </svg>
                    </div>
                    {t('header.connect_wallet')}
                  </button>):
                  (
                    <button onClick={(e)=>{e.preventDefault(); e.stopPropagation();setWalletModalOpen(true)}} className='font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-1 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out'>
                    
                    <div className='z-10 p-2 border-2 border-white rounded-full mr-2'>
                      <svg t="1658332020519" className=" w-5 h-5 fill-white text-white-300 hover:fill-white-200 transition duration-150 ease-in-out " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3154" >
                        <path  d="M922.4 256H160c-17.68 0-32-14.32-32-32s14.32-32 32-32h768c17.68 0 32-14.32 32-32 0-53.02-42.98-96-96-96H128C57.3 64 0 121.3 0 192v640c0 70.7 57.3 128 128 128h794.4c56.04 0 101.6-43.06 101.6-96V352c0-52.94-45.56-96-101.6-96zM832 672c-35.34 0-64-28.66-64-64s28.66-64 64-64 64 28.66 64 64-28.66 64-64 64z" p-id="3155"></path>
                      </svg>
                    </div>
                      {
                        truncateAddress(account)
                      }
                    </button>
                  )
                }
              </li>
              
            </ul>

          </nav>

          <div className='flex flex-nowarp md:hidden'>
            {/* Mobile language */}
            <nav >

              <ul className="flex grow justify-end flex-wrap items-center">
                
                <Dropdown title={(t("header.language"))}>
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
                <li>
                  <a 
                  className="text-gray-300 hover:text-gray-200  pr-4  flex items-center transition duration-150 ease-in-out"
                  
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    if(active){
                      setWalletModalOpen(true);
                    }else{
                      setConnectModalOpen(true);
                    }
                   }}
                  >
                    <div className='z-10 p-2 border border-purple-600 rounded-full bg-black '>
                      <svg t="1658332020519" className=" w-5 h-5 fill-purple-600 text-white-300 hover:fill-white-200 transition duration-150 ease-in-out " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3154" >
                        <path  d="M922.4 256H160c-17.68 0-32-14.32-32-32s14.32-32 32-32h768c17.68 0 32-14.32 32-32 0-53.02-42.98-96-96-96H128C57.3 64 0 121.3 0 192v640c0 70.7 57.3 128 128 128h794.4c56.04 0 101.6-43.06 101.6-96V352c0-52.94-45.56-96-101.6-96zM832 672c-35.34 0-64-28.66-64-64s28.66-64 64-64 64 28.66 64 64-28.66 64-64 64z" p-id="3155"></path>
                      </svg>

                    </div>
                    
                    <div className='bg-slate-600  -ml-4 pl-5 p-1.5 rounded-full'>
                      <svg className="w-3 h-3 fill-current text-white cursor-pointer shrink-0 " viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" />
                      </svg>
                    </div>
                    
                  </a>
                </li>
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
                <ul className="bg-gray-800 px-4 py-2 space-y-2">
                  <li className={props.current == 'trade'?' bg-purple-600':''}>
                    <Link to="/trade" className="flex text-gray-300 hover:text-gray-200 py-2 ml-2">{t('header.trade')}</Link>
                  </li>
                  <li className={props.current == 'trade_pool'?' bg-purple-600':''}>
                    <Link to="/trade-pool" className="flex text-gray-300 hover:text-gray-200 py-2  ml-2">{t('header.cap_pool')}</Link>
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
                  {/* <li>
                    {
                      !active ? (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConnectModalOpen(true); }}  className="font-medium w-full inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-4 py-2 my-2 rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out">
                        {t('header.connect_wallet')}
                      </button>):
                      (
                        <button onClick={(e)=>{e.preventDefault(); e.stopPropagation();setWalletModalOpen(true)}} className='font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out'>
                          {
                            truncateAddress(account)
                          }
                        </button>
                      )
                    }
                  </li> */}
                </ul>
              </nav>

            </div>
          </div>

        </div>
      </div>
      
      <ModalBasic id="connectModal" modalOpen={connectModalOpen} setModalOpen={setConnectModalOpen} title={t('Connect wallet')}>
        {/* Modal content */}
        <div className="px-5 pt-4 pb-4 space-y-4 ">
          <button className="btn border-slate-200 hover:border-slate-300 text-white w-full  flex justify-between px-16" onClick={() => {
                activate(connectors.injected);
                setProvider("injected");
                setConnectModalOpen();
              }}>
            <img src={TP} className='w-7 h-7 fill-current  shrink-0' />
            <span className='font-bold'>Token Pocket</span>
          </button>
          <button className="btn border-slate-200 hover:border-slate-300 text-white w-full  flex justify-between px-16 " onClick={() => {
                activate(connectors.injected);
                setProvider("injected");
                setConnectModalOpen(false);
              }}>
            
            <img src={MM} className='w-6 h-6 fill-current  shrink-0' />
            <span className='font-bold'>MetaMask</span>
          </button>
          {/* <button className="btn border-slate-200 hover:border-slate-300 text-slate-600 w-full  flex justify-between px-16" onClick={() => {
                activate(connectors.coinbaseWallet);
                setProvider("coinbaseWallet");
                setWalletModalOpen(false);
              }}>
            
            <img src={CBW} className='w-6 h-6 fill-current  shrink-0' />
            <span >Coinbase Wallet</span>
          </button> */}
          <button className="btn border-slate-200 hover:border-slate-300 text-white w-full  flex justify-between px-16"onClick={() => {
                activate(connectors.walletConnect);
                setProvider("walletConnect");
                setConnectModalOpen(false);
              }}>
            
            <img src={WC} className='w-7 h-7 fill-current text-slate-500 shrink-0' />
            <span className='font-bold'>Wallet Connect</span>
          </button>
          
        </div>
        
      </ModalBasic>
      <ModalBasic id="walletModal" modalOpen={walletModalOpen} setModalOpen={setWalletModalOpen} title={t("header.wallet.account")}>
        {/* Modal content */}
        <div className="px-5 pt-4 pb-4  space-y-4">
          <div>
            <div className=' text-xs text-slate-300'>{t('header.wallet.connected_wallet_address')}</div>
            <div className=' text-sm h-10 w-full flex flex-row  justify-center item-center rounded bg-gray-500 mt-2'  onClick={()=>{
              navigator.clipboard.writeText(account)
              toast.success(t("header.wallet.copy_successfully"))
            }
              }>
              <span className='my-auto  overflow-x-auto ml-3'>
                {account}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 my-auto mx-2 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              
            </div>
          </div>
          <div className='space-y-1'>
            <div className='flex justify-between'>
              <label className='text-sm text-slate-300'>资产名称</label>
              <div className='flex'>
                <span className='text-sm text-slate-300'>待领取</span>
              </div>
              <span className='text-sm text-slate-300'>余额</span>
            </div>
            <div className='flex justify-between'>
              <label className='text-sm text-slate-300'>BNB&nbsp;&nbsp;</label>
              <div className='flex'>
                <svg t="1658330660817" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1968" width="20" height="20">
                  <path d="M355.68 624a13.6 13.6 0 0 0-3.68 0h-128a16 16 0 0 0-16 16v272a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V640a16 16 0 0 0-12.32-16zM336 896h-96V656h96z" fill="#f f f" p-id="1969"></path>
                  <path d="M240 656v240h32v-48a16 16 0 0 1 32 0v48h32V656z m48 144a16 16 0 1 1 16-16 16 16 0 0 1-16 16z" fill="#ffff" opacity=".5" p-id="1970"></path>
                  <path d="M240 608v336a16 16 0 0 1-16 16H80a16 16 0 0 1 0-32h128V624H80a16 16 0 0 1 0-32h144a16 16 0 0 1 16 16zM304 896v16a16 16 0 0 1-32 0v-16z" fill="#ffff" p-id="1971"></path>
                  <path d="M640 304h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m0-48a16 16 0 0 0-16-16h-48v32h48a16 16 0 0 0 16-16zM624 144a208 208 0 1 0 208 208A208 208 0 0 0 624 144z m32 288v16a16 16 0 0 1-32 0v-16h-16v16a16 16 0 0 1-32 0v-16h-16a16 16 0 0 1 0-32v-96a16 16 0 0 1 0-32h16v-16a16 16 0 0 1 32 0v16h16v-16a16 16 0 0 1 32 0v18.88A48 48 0 0 1 688 320a48.96 48.96 0 0 1-6.08 23.52A48 48 0 0 1 656 432z m0-64h-64v32h64a16 16 0 0 0 0-32z m0-48a16 16 0 0 0-16-16h-48v32h48a16 16 0 0 0 16-16z m-16-16h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z" fill="#f4ea2a" opacity=".5" p-id="1972" data-spm-anchor-id="a313x.7781069.0.i11" className="selected"></path>
                  <path d="M624 64a288 288 0 0 0-180.48 512 273.6 273.6 0 0 0 44.96 29.76A16 16 0 0 0 496 608h125.28a35.68 35.68 0 0 1 19.04 5.44 34.72 34.72 0 0 1 7.52 6.24 32 32 0 0 1 5.6 8 16 16 0 0 0 14.24 8.8h2.56q8.8-1.44 17.28-3.36a280.48 280.48 0 0 0 41.76-12.8A288 288 0 0 0 624 64z m51.52 538.72l-3.2-3.84-0.32-0.96a64.8 64.8 0 0 0-12.8-10.88 65.76 65.76 0 0 0-21.44-9.12 69.92 69.92 0 0 0-8-1.44 65.12 65.12 0 0 0-8 0h-121.76a256 256 0 1 1 176 26.72z" fill="#f4ea2a" p-id="1973" data-spm-anchor-id="a313x.7781069.0.i10" className=""></path>
                  <path d="M725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 632.96q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.24-32 14.08 14.08 0 0 0 0.16-2.88z m256 0a60.32 60.32 0 0 0-44.16-20.16 64.96 64.96 0 0 0-33.76 8 70.72 70.72 0 0 0-16 11.36L825.44 656l-66.08 66.08c-3.2 3.36-5.76 6.24-7.84 8.8-4.64 5.28-4.64 5.28-10.08 5.28H577.76a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64 14.88 14.88 0 0 1 11.04-4.8h48a64 64 0 0 0 57.6-36.16 60.8 60.8 0 0 0 6.24-32 14.08 14.08 0 0 0 0-2.56 52 52 0 0 0-5.44-19.36 65.44 65.44 0 0 0-9.76-14.72l-0.64-1.28a64.8 64.8 0 0 0-12.8-10.88 65.76 65.76 0 0 0-21.44-9.12 69.92 69.92 0 0 0-8-1.44 65.12 65.12 0 0 0-8 0H448a20.32 20.32 0 0 0-4.48 0A112 112 0 0 0 336 688v192a16 16 0 0 0 16 16h334.56a176 176 0 0 0 123.36-50.4l130.4-128a64 64 0 0 0 18.4-44.32 62.08 62.08 0 0 0-15.84-40.8z m-25.12 62.88l-130.24 128A144 144 0 0 1 686.56 864H368V688a80 80 0 0 1 80-80h173.28a35.68 35.68 0 0 1 19.04 5.44 34.72 34.72 0 0 1 7.52 6.24 32 32 0 0 1 5.6 8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h163.68a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88l90.24-90.24a33.12 33.12 0 0 1 25.6-10.24 28.8 28.8 0 0 1 20.96 9.6 29.92 29.92 0 0 1 7.84 20.16 30.72 30.72 0 0 1-8.96 20.96zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768z" fill="#ffff" p-id="1974"></path>
                  <path d="M864.96 620.32a63.04 63.04 0 0 0-54.4-48h-6.56a62.4 62.4 0 0 0-44.32 18.24l-30.24 30.24-48 48-29.6 28.8-38.4 38.4-4.64 4.64a16 16 0 0 0-3.36 17.44 16 16 0 0 0 14.72 9.92h105.28a80 80 0 0 0 56.64-23.36L848 678.56a64 64 0 0 0 18.4-44.32 57.12 57.12 0 0 0-1.44-13.92z m-105.6 101.6a48 48 0 0 1-33.92 14.08h-66.72l123.52-123.36a29.76 29.76 0 0 1 21.6-8.96 29.92 29.92 0 0 1 21.6 8.96 30.4 30.4 0 0 1 8.96 21.6 30.88 30.88 0 0 1-8.96 21.76z" fill="#ffff" p-id="1975"></path><path d="M64 608h160v336H64z" fill="#ffff" opacity=".5" p-id="1976"></path></svg>
                <span className='text-lg text-white'>1.2392</span>
              </div>
              <span className='text-lg text-white'>1.2392</span>
            </div>
            <div className='flex justify-between'>
              <label className='text-sm text-slate-300'>USDT</label>
              <div className='flex'>
                <svg t="1658330660817" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1968" width="20" height="20">
                  <path d="M355.68 624a13.6 13.6 0 0 0-3.68 0h-128a16 16 0 0 0-16 16v272a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V640a16 16 0 0 0-12.32-16zM336 896h-96V656h96z" fill="#f f f" p-id="1969"></path>
                  <path d="M240 656v240h32v-48a16 16 0 0 1 32 0v48h32V656z m48 144a16 16 0 1 1 16-16 16 16 0 0 1-16 16z" fill="#ffff" opacity=".5" p-id="1970"></path>
                  <path d="M240 608v336a16 16 0 0 1-16 16H80a16 16 0 0 1 0-32h128V624H80a16 16 0 0 1 0-32h144a16 16 0 0 1 16 16zM304 896v16a16 16 0 0 1-32 0v-16z" fill="#ffff" p-id="1971"></path>
                  <path d="M640 304h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m0-48a16 16 0 0 0-16-16h-48v32h48a16 16 0 0 0 16-16zM624 144a208 208 0 1 0 208 208A208 208 0 0 0 624 144z m32 288v16a16 16 0 0 1-32 0v-16h-16v16a16 16 0 0 1-32 0v-16h-16a16 16 0 0 1 0-32v-96a16 16 0 0 1 0-32h16v-16a16 16 0 0 1 32 0v16h16v-16a16 16 0 0 1 32 0v18.88A48 48 0 0 1 688 320a48.96 48.96 0 0 1-6.08 23.52A48 48 0 0 1 656 432z m0-64h-64v32h64a16 16 0 0 0 0-32z m0-48a16 16 0 0 0-16-16h-48v32h48a16 16 0 0 0 16-16z m-16-16h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z" fill="#f4ea2a" opacity=".5" p-id="1972" data-spm-anchor-id="a313x.7781069.0.i11" className="selected"></path>
                  <path d="M624 64a288 288 0 0 0-180.48 512 273.6 273.6 0 0 0 44.96 29.76A16 16 0 0 0 496 608h125.28a35.68 35.68 0 0 1 19.04 5.44 34.72 34.72 0 0 1 7.52 6.24 32 32 0 0 1 5.6 8 16 16 0 0 0 14.24 8.8h2.56q8.8-1.44 17.28-3.36a280.48 280.48 0 0 0 41.76-12.8A288 288 0 0 0 624 64z m51.52 538.72l-3.2-3.84-0.32-0.96a64.8 64.8 0 0 0-12.8-10.88 65.76 65.76 0 0 0-21.44-9.12 69.92 69.92 0 0 0-8-1.44 65.12 65.12 0 0 0-8 0h-121.76a256 256 0 1 1 176 26.72z" fill="#f4ea2a" p-id="1973" data-spm-anchor-id="a313x.7781069.0.i10" className=""></path>
                  <path d="M725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 632.96q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.24-32 14.08 14.08 0 0 0 0.16-2.88z m256 0a60.32 60.32 0 0 0-44.16-20.16 64.96 64.96 0 0 0-33.76 8 70.72 70.72 0 0 0-16 11.36L825.44 656l-66.08 66.08c-3.2 3.36-5.76 6.24-7.84 8.8-4.64 5.28-4.64 5.28-10.08 5.28H577.76a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64 14.88 14.88 0 0 1 11.04-4.8h48a64 64 0 0 0 57.6-36.16 60.8 60.8 0 0 0 6.24-32 14.08 14.08 0 0 0 0-2.56 52 52 0 0 0-5.44-19.36 65.44 65.44 0 0 0-9.76-14.72l-0.64-1.28a64.8 64.8 0 0 0-12.8-10.88 65.76 65.76 0 0 0-21.44-9.12 69.92 69.92 0 0 0-8-1.44 65.12 65.12 0 0 0-8 0H448a20.32 20.32 0 0 0-4.48 0A112 112 0 0 0 336 688v192a16 16 0 0 0 16 16h334.56a176 176 0 0 0 123.36-50.4l130.4-128a64 64 0 0 0 18.4-44.32 62.08 62.08 0 0 0-15.84-40.8z m-25.12 62.88l-130.24 128A144 144 0 0 1 686.56 864H368V688a80 80 0 0 1 80-80h173.28a35.68 35.68 0 0 1 19.04 5.44 34.72 34.72 0 0 1 7.52 6.24 32 32 0 0 1 5.6 8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h163.68a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88l90.24-90.24a33.12 33.12 0 0 1 25.6-10.24 28.8 28.8 0 0 1 20.96 9.6 29.92 29.92 0 0 1 7.84 20.16 30.72 30.72 0 0 1-8.96 20.96zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768z" fill="#ffff" p-id="1974"></path>
                  <path d="M864.96 620.32a63.04 63.04 0 0 0-54.4-48h-6.56a62.4 62.4 0 0 0-44.32 18.24l-30.24 30.24-48 48-29.6 28.8-38.4 38.4-4.64 4.64a16 16 0 0 0-3.36 17.44 16 16 0 0 0 14.72 9.92h105.28a80 80 0 0 0 56.64-23.36L848 678.56a64 64 0 0 0 18.4-44.32 57.12 57.12 0 0 0-1.44-13.92z m-105.6 101.6a48 48 0 0 1-33.92 14.08h-66.72l123.52-123.36a29.76 29.76 0 0 1 21.6-8.96 29.92 29.92 0 0 1 21.6 8.96 30.4 30.4 0 0 1 8.96 21.6 30.88 30.88 0 0 1-8.96 21.76z" fill="#ffff" p-id="1975"></path><path d="M64 608h160v336H64z" fill="#ffff" opacity=".5" p-id="1976"></path></svg>
                <span className='text-lg text-white'>1.2392</span>
              </div>
              <span className='text-lg text-white'>21.2392</span>
            </div>
            <div className='flex justify-between'>
              <label className='text-sm text-slate-100'>TCP&nbsp;&nbsp;</label>
              <div className='flex'>
                <svg t="1658330660817" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1968" width="20" height="20">
                  <path d="M355.68 624a13.6 13.6 0 0 0-3.68 0h-128a16 16 0 0 0-16 16v272a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V640a16 16 0 0 0-12.32-16zM336 896h-96V656h96z" fill="#f f f" p-id="1969"></path>
                  <path d="M240 656v240h32v-48a16 16 0 0 1 32 0v48h32V656z m48 144a16 16 0 1 1 16-16 16 16 0 0 1-16 16z" fill="#ffff" opacity=".5" p-id="1970"></path>
                  <path d="M240 608v336a16 16 0 0 1-16 16H80a16 16 0 0 1 0-32h128V624H80a16 16 0 0 1 0-32h144a16 16 0 0 1 16 16zM304 896v16a16 16 0 0 1-32 0v-16z" fill="#ffff" p-id="1971"></path>
                  <path d="M640 304h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m0-48a16 16 0 0 0-16-16h-48v32h48a16 16 0 0 0 16-16zM624 144a208 208 0 1 0 208 208A208 208 0 0 0 624 144z m32 288v16a16 16 0 0 1-32 0v-16h-16v16a16 16 0 0 1-32 0v-16h-16a16 16 0 0 1 0-32v-96a16 16 0 0 1 0-32h16v-16a16 16 0 0 1 32 0v16h16v-16a16 16 0 0 1 32 0v18.88A48 48 0 0 1 688 320a48.96 48.96 0 0 1-6.08 23.52A48 48 0 0 1 656 432z m0-64h-64v32h64a16 16 0 0 0 0-32z m0-48a16 16 0 0 0-16-16h-48v32h48a16 16 0 0 0 16-16z m-16-16h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z m16 64h-64v32h64a16 16 0 0 0 0-32z m0 0h-64v32h64a16 16 0 0 0 0-32z m-16-64h-48v32h48a16 16 0 0 0 0-32z m0 0h-48v32h48a16 16 0 0 0 0-32z" fill="#f4ea2a" opacity=".5" p-id="1972" data-spm-anchor-id="a313x.7781069.0.i11" className="selected"></path>
                  <path d="M624 64a288 288 0 0 0-180.48 512 273.6 273.6 0 0 0 44.96 29.76A16 16 0 0 0 496 608h125.28a35.68 35.68 0 0 1 19.04 5.44 34.72 34.72 0 0 1 7.52 6.24 32 32 0 0 1 5.6 8 16 16 0 0 0 14.24 8.8h2.56q8.8-1.44 17.28-3.36a280.48 280.48 0 0 0 41.76-12.8A288 288 0 0 0 624 64z m51.52 538.72l-3.2-3.84-0.32-0.96a64.8 64.8 0 0 0-12.8-10.88 65.76 65.76 0 0 0-21.44-9.12 69.92 69.92 0 0 0-8-1.44 65.12 65.12 0 0 0-8 0h-121.76a256 256 0 1 1 176 26.72z" fill="#f4ea2a" p-id="1973" data-spm-anchor-id="a313x.7781069.0.i10" className=""></path>
                  <path d="M725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 632.96q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.24-32 14.08 14.08 0 0 0 0.16-2.88z m256 0a60.32 60.32 0 0 0-44.16-20.16 64.96 64.96 0 0 0-33.76 8 70.72 70.72 0 0 0-16 11.36L825.44 656l-66.08 66.08c-3.2 3.36-5.76 6.24-7.84 8.8-4.64 5.28-4.64 5.28-10.08 5.28H577.76a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64 14.88 14.88 0 0 1 11.04-4.8h48a64 64 0 0 0 57.6-36.16 60.8 60.8 0 0 0 6.24-32 14.08 14.08 0 0 0 0-2.56 52 52 0 0 0-5.44-19.36 65.44 65.44 0 0 0-9.76-14.72l-0.64-1.28a64.8 64.8 0 0 0-12.8-10.88 65.76 65.76 0 0 0-21.44-9.12 69.92 69.92 0 0 0-8-1.44 65.12 65.12 0 0 0-8 0H448a20.32 20.32 0 0 0-4.48 0A112 112 0 0 0 336 688v192a16 16 0 0 0 16 16h334.56a176 176 0 0 0 123.36-50.4l130.4-128a64 64 0 0 0 18.4-44.32 62.08 62.08 0 0 0-15.84-40.8z m-25.12 62.88l-130.24 128A144 144 0 0 1 686.56 864H368V688a80 80 0 0 1 80-80h173.28a35.68 35.68 0 0 1 19.04 5.44 34.72 34.72 0 0 1 7.52 6.24 32 32 0 0 1 5.6 8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h163.68a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88l90.24-90.24a33.12 33.12 0 0 1 25.6-10.24 28.8 28.8 0 0 1 20.96 9.6 29.92 29.92 0 0 1 7.84 20.16 30.72 30.72 0 0 1-8.96 20.96zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768zM688 635.52a14.08 14.08 0 0 0 0-2.56q-8.48 1.92-17.28 3.36h-2.56a16 16 0 0 1-14.24-8.8 24 24 0 0 1 2.4 10.08 30.88 30.88 0 0 1-9.28 24.8A32 32 0 0 1 624 672h-48a46.72 46.72 0 0 0-33.76 14.08 48 48 0 0 0-14.24 38.24A49.44 49.44 0 0 0 577.76 768h42.4a16 16 0 0 1-14.72-9.92 16 16 0 0 1 3.36-17.44l4.64-4.64h-35.68a17.12 17.12 0 0 1-17.6-14.72 15.04 15.04 0 0 1 4.8-12.64A14.88 14.88 0 0 1 576 704h48a62.88 62.88 0 0 0 27.84-6.4l29.76-29.76a60.8 60.8 0 0 0 6.4-32.32zM725.44 768h16a39.04 39.04 0 0 0 34.4-16 73.6 73.6 0 0 1 6.24-6.88A80 80 0 0 1 725.44 768z" fill="#ffff" p-id="1974"></path>
                  <path d="M864.96 620.32a63.04 63.04 0 0 0-54.4-48h-6.56a62.4 62.4 0 0 0-44.32 18.24l-30.24 30.24-48 48-29.6 28.8-38.4 38.4-4.64 4.64a16 16 0 0 0-3.36 17.44 16 16 0 0 0 14.72 9.92h105.28a80 80 0 0 0 56.64-23.36L848 678.56a64 64 0 0 0 18.4-44.32 57.12 57.12 0 0 0-1.44-13.92z m-105.6 101.6a48 48 0 0 1-33.92 14.08h-66.72l123.52-123.36a29.76 29.76 0 0 1 21.6-8.96 29.92 29.92 0 0 1 21.6 8.96 30.4 30.4 0 0 1 8.96 21.6 30.88 30.88 0 0 1-8.96 21.76z" fill="#ffff" p-id="1975"></path><path d="M64 608h160v336H64z" fill="#ffff" opacity=".5" p-id="1976"></path></svg>
                <span className='text-lg text-white'>1.2392</span>
              </div>
              <span className='text-lg text-white'>1.2392</span>
            </div>
          </div>

          
          <div className='flex justify-around text-purple-600  w-full'>
            <a href={`https://bscscan.com/address/${account}`} target="_blank" className='flex flex-nowarp space-x-1 cursor-pointer'>
              <span>{t('header.wallet.details')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
            <div className='flex flex-nowarp  space-x-1 cursor-pointer' onClick={()=>{
              navigator.clipboard.writeText(account)
            }
              }>
              <span>{t("header.wallet.transactions")}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div className='flex flex-nowarp space-x-1 text-red-500 cursor-pointer' onClick={() => {
                disconnect();
                setWalletModalOpen(false);
              }}>
              <span className='text-red '>{t("header.wallet.log_out")}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

        </div>
        
      </ModalBasic>

    </div>
  );
}

export default AppHeader;
