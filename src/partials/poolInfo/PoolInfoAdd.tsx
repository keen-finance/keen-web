import React,{ useState, useRef, useEffect }from 'react';
import { Link } from 'react-router-dom';
import keenLogo from '../../images/token/keen.jpg';
import usdtLogo from '../../images/token/usdt.png';
import AddLiquidity from './AddLiquidity';
import RemoveLiquidity from './RemoveLiquidity';
import Transaction from '../transaction/Transaction'
import Dropdown from '../../utils/Dropdown';
function PoolInfoAdd() {
  const [tabIndex,setTabIndex] = useState(0);
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12">
          {/*  Articles list */}
          <div className="max-w-full mx-auto md:max-w-none  md:space-x-3 flex-warp md:flex">
            {/*  Articles container */}
            <div className="flex flex-col w-full md:w-1/3 space-y-3" data-aos="fade-up" data-aos-delay="200">
              {/*  1st article */}
              <div className="flex flex-col h-full bg-gray-800 rounded-2xl " >
                <div className='ml-6 mt-6 text-cyan-600'>
                  我的流动性
                </div>
                
                <div className='m-6 p-3 space-y-3 rounded rounded-xl bg-gray-900'>
                
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0  w-4 bg-white" src={usdtLogo} />
                      <img className="rounded-full shrink-0 mr-1 w-4  bg-white" src={keenLogo}  />
                      <span  className="text-slate-500  transition duration-150 ease-in-out">USDT-KEEN LP:</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0 mr-1 w-6 bg-white" src={usdtLogo} />
                      <span  className="text-slate-500  transition duration-150 ease-in-out">已入池 USDT:</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0 mr-1 w-6  bg-white" src={keenLogo}  />
                      <span  className="text-slate-500 transition duration-150 ease-in-out">已入池 KEEN:</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <span  className="text-slate-500 transition duration-150 ease-in-out">流动池中的份额:</span>
                    </div>
                    <span className="">91%</span>
                  </div>
                </div>
                <div className='mx-6 text-cyan-600'>
                  委员会
                </div>
                <div className='m-6 p-3 space-y-3 rounded rounded-xl bg-gray-900'>
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0  w-4 bg-white" src={usdtLogo} />
                      <img className="rounded-full shrink-0 mr-1 w-4  bg-white" src={keenLogo}  />
                      <span  className="text-slate-500  transition duration-150 ease-in-out">已释放 LP:</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                
                  <div className="flex items-center w-full justify-between">
                    <div className='flex items-center'>
                      <img className="rounded-full shrink-0  w-4 bg-white" src={usdtLogo} />
                      <img className="rounded-full shrink-0 mr-1 w-4  bg-white" src={keenLogo}  />
                      <span  className="text-slate-500  transition duration-150 ease-in-out">待释放 LP:</span>
                    </div>
                    <span className="">1,000</span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-2/3 bg-gray-800 rounded-2xl mt-3 md:mt-0" data-aos="fade-up" data-aos-delay="200">
              <div className='w-full flex bg-cyan-600 h-12 rounded-t-2xl '>
                <button className={`w-full  h-full text-center  rounded-t-2xl ${tabIndex==0?'bg-gray-800':''}`} onClick={()=>{setTabIndex(0)}}>
                  增加流动性
                </button>
                <button className={`w-full h-full text-center  rounded-t-2xl ${tabIndex==1?'bg-gray-800':''}`} onClick={()=>{setTabIndex(1)}}>
                  减少流动性
                </button>
              </div>
              <div className='' >
                {
                  tabIndex == 0 && <AddLiquidity/>
                }
                {
                  tabIndex == 1 && <RemoveLiquidity/>
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

export default PoolInfoAdd;