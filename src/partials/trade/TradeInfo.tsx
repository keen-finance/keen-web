import React,{ useState, useRef, useEffect }from 'react';
import { Link } from 'react-router-dom';
import keenLogo from '../../images/token/keen.jpg';
import usdtLogo from '../../images/token/usdt.png';
import KlineView from './KlineView';
import Transaction from '../transaction/Transaction'
import Dropdown from '../../utils/Dropdown';
import ModalBasic from '../../utils/ModalBasic';
import BetView from './BetView'
function TradeInfo() {
  const [tabIndex,setTabIndex] = useState(0);
  const [betModalOpen, setBetModalOpen] = useState(true);
  const [betStartTime, setBetStartTime] = useState(Number);
  const [countdown, setCountdown] = useState(0);

  useEffect(()=>{
    console.log("countdown",countdown)
    if(countdown > 0){
      let interval2 = setTimeout(function(){
        setCountdown(countdown-1)
      },1000)
    }else{
      setCountdown(null)
    }
  },[countdown])

  useEffect(()=>{

    setCountdown(10) 

    let interval2 = setInterval(function(){
      setCountdown(10) 
    },20000)
    return () =>{
      // clearInterval(interval1)
      clearInterval(interval2)
    }
  },[])

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-16 md:pt-32 pb-3">
          
          <div className="max-w-full mx-auto md:max-w-none md:space-x-3 flex-warp md:flex ">
            {/*  Kline view */}
            <div className="flex flex-col w-full md:w-2/3 space-y-3 " >
              <div className='flex bg-gray-800 rounded-2xl items-start md:items-center shadow shadow-gray-600 py-1 md:py-4' >

                <div className='flex flex-col md:flex-row items-center'>
                  <div className='flex '>
                    
                    <Dropdown title={"USDT/KEEN"} titleClass="font-bold text-white" icon='select'>
                        <li onClick={() => {
                          
                        }}>
                          <div className="font-medium  text-white hover:text-purple-500 flex py-2 px-4 leading-tight cursor-pointer" >
                            <img src={usdtLogo} className='h-4 w-4 bg-white rounded-full'/>
                            <img src={keenLogo} className='h-4 w-4 bg-white rounded-full'/>
                            USDTKEEN
                          </div>
                        </li>
                        <li onClick={() => {
                          
                        }}>
                          <div className="font-medium  text-white hover:text-purple-500 flex py-2 px-4 leading-tight cursor-pointer">
                            <img src={usdtLogo} className='h-4 w-4 bg-white rounded-full'/>
                            <img src={keenLogo} className='h-4 w-4 bg-white rounded-full'/>
                            TCPKEEN
                          </div>
                        </li>
                      </Dropdown>
                  </div>

                  <div className='h-16 my-auro mr-4 border-l border-gray-700 hidden md:flex'>
                  </div>

                  <div className='font-bold text-3xl mr-4 text-teal-400'>
                    2000.9
                  </div>
                </div>

                <div className='flex flex-wrap ml-6 md:m-0 text-xs '>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2 '>
                    <div className=' text-gray-500'>当前买量</div>
                    <div className=''>1,876.4</div>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className='text-gray-500'>当前卖量</div>
                    <div className=''>1,876.4</div>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h涨(次)</div>
                    <div className=''>10</div>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h跌(次)</div>
                    <div className=''>100次</div>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h买量</div>
                    <div className=''>1,876.4</div>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h卖量</div>
                    <div className=''>1,876.4</div>
                  </div>
                </div>


              </div>
              <div className='h-96 bg-gray-800 rounded-2xl mt-3 md:mt-0  shadow shadow-gray-600' >
                <KlineView/>
              </div>
              
            </div>
            {/*  bet view desktop */}
            <BetView/>
            {/*  bet view mobile */}
            <div className='md:hidden fixed inset-x-0 bottom-0 w-full bg-gray-800 z-10 rounded-t-2xl shadow-2xl shadow-white p-4'>
              <div className='flex flex-col w-full items-center '>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> */}
                {
                  countdown && countdown > 0 && 
                  <>
                  <div className='text-xs text-slate-300'>等待时间</div>
                  <div className='text-white space-x-2'>
                    <span className='text-2xl font-bold '>{countdown}</span>
                    <span>S</span>
                  </div>
                  </>
                }
                {
                  !countdown && 
                  <>
                  <div className='text-white space-x-2'>
                    <span>做比交易吧</span>
                  </div>
                  </>
                }
                
              </div>
              
              <div className='flex flex-nowrap space-x-4 text-white '>
                <button className="btn  bg-teal-500 w-full rounded-full disabled:cursor-not-allowed	disabled:opacity-25" disabled={countdown != null}>
                  买
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </button>
                <button className="btn  bg-red-500  w-full rounded-full disabled:cursor-not-allowed	disabled:opacity-25" disabled={countdown != null}>
                  卖
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </button>
              </div>
            </div>
            <ModalBasic id="walletModal" modalOpen={betModalOpen} setModalOpen={setBetModalOpen} title={''}>
              <BetView/>
            </ModalBasic>
            
          </div>
          <div  className="max-w-full mx-auto md:max-w-none  md:space-x-3 flex-warp md:flex" >
            
            <Transaction />
          </div>
          
        </div>

      </div>

    </section>
  );
}

export default TradeInfo;