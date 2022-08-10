import React,{ useState, useRef, useEffect }from 'react';

import keenLogo from '../images/token/keen.jpg';
import usdtLogo from '../images/token/usdt.png';

import Dropdown from '../utils/Dropdown';
function AppPageHeader(
  {
    children
  }
) {
  const [tabIndex,setTabIndex] = useState(0);
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 md:pt-32 pb-3">
          {/*  Page header */}
          <div className="" >
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
                      <div className="font-medium text-sm text-white hover:text-purple-500 flex py-2 px-4 leading-tight cursor-pointer" >
                        <img src={usdtLogo} className='h-4 w-4 bg-white rounded-full'/>
                        <img src={keenLogo} className='h-4 w-4 bg-white rounded-full'/>
                        USDT / KEEN
                      </div>
                    </li>
                    <li onClick={() => {
                      
                    }}>
                      <div className="font-medium text-sm text-white hover:text-purple-500 flex py-2 px-4 leading-tight cursor-pointer">
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
            <div className='w-full max-w-full flex justify-between mt-3' >
              <a href='https://bscscan.com/address/0xab839ca2e28d379b068f7d1449f16f4ea55fecdb' target={'_blank'} className='flex text-purple-600 hover:underline items-end' data-aos="fade-up">
                <div className=''>
                  在 BscScan 上查看
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppPageHeader;