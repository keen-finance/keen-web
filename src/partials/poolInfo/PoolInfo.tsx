import React,{ useState, useRef, useEffect }from 'react';
import { Link } from 'react-router-dom';
import keenLogo from '../../images/token/keen.jpg';
import usdtLogo from '../../images/token/usdt.png';
import AnalyticsLiquidity from './AnalyticsLiquidity';
import AnalyticsVolume from './AnalyticsVolume';
import Transaction from '../transaction/Transaction'
import Dropdown from '../../utils/Dropdown';
function PoolInfo() {
  const [tabIndex,setTabIndex] = useState(0);
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">


          {/*  Page header */}
          <div className=" pb-12 " >
            {/* top */}
            <div className=''>
              {/* left */}
              <div className='' data-aos="fade-up">
                <div className='flex items-center h-12'>
                  <div className='flex items-center justify-between h-12'>
                    <img src={usdtLogo} className='h-8 w-8 bg-white rounded-full'/>
                    <img src={keenLogo} className='h-8 w-8 bg-white rounded-full'/>
                  </div>
                  <h2 className="h2 ml-3" >USDT / KEEN</h2>
                  <Dropdown title={"切换"} icon='select'>
                    <li onClick={() => {
                      
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer" >
                        <img src={usdtLogo} className='h-4 w-4 bg-white rounded-full'/>
                        <img src={keenLogo} className='h-4 w-4 bg-white rounded-full'/>
                        USDT / KEEN
                      </div>
                    </li>
                    <li onClick={() => {
                      
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                        <img src={usdtLogo} className='h-4 w-4 bg-white rounded-full'/>
                        <img src={keenLogo} className='h-4 w-4 bg-white rounded-full'/>
                        TCP / KEEN
                      </div>
                    </li>
                  </Dropdown>
                </div>
              </div>
            </div>
            {/* bottom */}
            <div className='w-full max-w-full flex-warp md:flex justify-between' >
              <a href='https://bscscan.com/address/0xab839ca2e28d379b068f7d1449f16f4ea55fecdb' target={'_blank'} className='flex content-right text-purple-600 hover:underline  mt-6' data-aos="fade-up">
                <div className=''>
                  在 BscScan 上查看
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <div className='flex space-x-2 h-16 mt-3 w-96 max-w-full'>
                <Link to={`/add`} className='font-medium w-2/3 inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-4 py-1 my-2 rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out' data-aos="fade-up" data-aos-delay="200">
                  增加流动性
                </Link>
                <Link to="/trade" className='font-medium w-1/3 inline-flex items-center justify-center border border-transparent px-4 py-1 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out' data-aos="fade-up" data-aos-delay="400">
                  交易
                </Link>
              </div>
            </div>
          </div>
          

          {/*  Articles list */}
          <div className="max-w-full mx-auto md:max-w-none  md:space-x-3 flex-warp md:flex">
            {/*  Articles container */}
            <div className="flex flex-col w-full md:w-1/3 space-y-3" data-aos="fade-up" data-aos-delay="200">
              {/*  1st article */}
              <div className="flex flex-col h-full bg-gray-800 rounded-2xl " >
                <div className='m-6 flex flex-row justify-between'>
                  <div className='space-y-3'>
                    <div className='text-cyan-600'>
                      流动性
                    </div>
                    <div className='font-bold text-2xl'>
                      $164.3M
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='text-cyan-600'>
                      交易总量
                    </div>
                    <div className='font-bold text-2xl'>
                      $164.3M
                    </div>
                  </div>
                </div>
                
                <div className='m-6 p-3 space-y-3 rounded rounded-xl bg-gray-900'>
                  <div className='text-cyan-600'>
                      锁定代币总量
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0 mr-4 w-8" src={usdtLogo} alt="Author 01" />
                      <span  className="text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out">USDT</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0 mr-4 w-8" src={usdtLogo} alt="Author 01" />
                      <span  className="text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out">USDT</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                </div>
              </div>
              {/*  2st article */}
              <div className="flex flex-col h-full bg-gray-800 rounded-2xl">
                <div className='m-6 flex flex-row justify-between'>
                  <div className='space-y-3'>
                    <div className='text-cyan-600'>
                      流动性
                    </div>
                    <div className='font-bold text-2xl'>
                      $164.3M
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='text-cyan-600'>
                      交易总量
                    </div>
                    <div className='font-bold text-2xl'>
                      $164.3M
                    </div>
                  </div>
                </div>
                
                <div className='m-6 p-3 space-y-3 rounded rounded-xl bg-gray-900'>
                  <div className='text-cyan-600'>
                      锁定代币总量
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0 mr-4 w-8" src={usdtLogo} alt="Author 01" />
                      <span  className="text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out">USDT</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0 mr-4 w-8" src={usdtLogo} alt="Author 01" />
                      <span  className="text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out">USDT</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-2/3 bg-gray-800 rounded-2xl mt-3 md:mt-0" data-aos="fade-up" data-aos-delay="200">
              <div className='w-full flex bg-cyan-600 h-12 rounded-t-2xl '>
                <button className={`w-full  h-full text-center  rounded-t-2xl ${tabIndex==0?'bg-gray-800':''}`} onClick={()=>{setTabIndex(0)}}>
                  流动性
                </button>
                <button className={`w-full h-full text-center  rounded-t-2xl ${tabIndex==1?'bg-gray-800':''}`} onClick={()=>{setTabIndex(1)}}>
                  交易量
                </button>
              </div>
              <div className='h-96 md:h-full min-h-max' >
                {
                  tabIndex == 0 && <AnalyticsLiquidity/>
                }
                {
                  tabIndex == 1 && <AnalyticsVolume/>
                }
              </div>
              
            </div>
          </div>
          <div  className="max-w-full mx-auto md:max-w-none  md:space-x-3 flex-warp md:flex" data-aos="fade-up">
            
            <Transaction />
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default PoolInfo;