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
        <div className="pb-12 md:pb-20">
          
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
              {/* <div className="flex flex-col h-full bg-gray-800 rounded-2xl">
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
              </div> */}
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