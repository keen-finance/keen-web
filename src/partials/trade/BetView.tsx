import React,{ useState, useRef, useEffect } from 'react';
import keenLogo from '../../images/token/keen.jpg';
import usdtLogo from '../../images/token/usdt.png';

function BetView() {
  
  return (
    <div className="hidden md:flex flex-col w-full md:w-1/3 space-y-3 rounded-2xl shadow shadow-gray-600 " >
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
      
    </div>
  );
}

export default BetView;
