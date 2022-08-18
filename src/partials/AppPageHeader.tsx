import React,{ useState, useRef, useEffect }from 'react';


import Dropdown from '../utils/Dropdown';
import { useLocalStorage } from '@rehooks/local-storage';
import {buildContracts,pairsContracts,getTokenLogo} from "../utils/contracts";
function AppPageHeader(
  {
    children
  }
  
) {
  const [tabIndex,setTabIndex] = useState(0);
  const [parisIndex,setParisIndex] = useLocalStorage("parisIndex",0);

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
                    <img src={getTokenLogo(pairsContracts[parisIndex].token0.name)} className='h-8 w-8 bg-white rounded-full'/>
                    <img src={getTokenLogo(pairsContracts[parisIndex].token1.name)} className='h-8 w-8 bg-white rounded-full'/>
                  </div>
                  <h2 className="h2 ml-3" >{pairsContracts[parisIndex].name}</h2>
                  <Dropdown title={"切换"} icon='select'>
                    {
                      pairsContracts.map((item,index)=>{
                        return <li onClick={() => {
                          setParisIndex(index)
                        }}>
                          <div className="font-medium text-sm text-white hover:text-purple-500 flex py-2 px-4 leading-tight cursor-pointer" >
                            <img src={getTokenLogo(item.token0.name)} className='h-4 w-4 bg-white rounded-full'/>
                            <img src={getTokenLogo(item.token1.name)} className='h-4 w-4 bg-white rounded-full'/>
                            {item.name}
                          </div>
                        </li>
                      })
                    }
                  </Dropdown>
                </div>
              </div>
            </div>
            {/* bottom */}
            <div className='w-full max-w-full flex justify-between mt-3' >
              <a href={`https://bscscan.com/address/${pairsContracts[parisIndex].address}`} target={'_blank'} className='flex text-purple-600 hover:underline items-end' data-aos="fade-up">
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