import React,{ useState, useRef, useEffect } from 'react';
import keenLogo from '../../images/token/keen.jpg';
import usdtLogo from '../../images/token/usdt.png';

function BetView() {
  const [betStartTime, setBetStartTime] = useState(Number);
  const [buyRadio, setBuyRadio] = useState(10);
  const [countdown, setCountdown] = useState(0);
  const [buyCountdown, setBuyCountdown] = useState(0);
  useEffect(()=>{
    console.log("countdown",countdown)
    if(countdown > 0){
      let interval2 = setTimeout(function(){
        setCountdown(countdown-1)
      },1000)
    }else if(countdown == 0){
      setCountdown(null)
      setBuyCountdown(30)
    }
  },[countdown])

  useEffect(()=>{
    console.log("buyCountdown",buyCountdown)
    if(buyCountdown > 0){
      let interval2 = setTimeout(function(){
        setBuyCountdown(buyCountdown-1)
      },1000)
    }else if(buyCountdown == 0){
      setBuyCountdown(null)
      setCountdown(30)
    }
  },[buyCountdown])

  useEffect(()=>{

    setCountdown(30) 

    let interval2 = setTimeout(function(){
      setCountdown(30) 
    },60000)

    let interval1 = setInterval(function(){
      setBuyRadio(random(1, 95));
    },1000)
    return () =>{
      // clearInterval(interval1)
      clearInterval(interval2)
    }
  },[])
  function random(min, max) {
 
    return Math.floor(Math.random() * (max - min)) + min;
   
  }
  return (
    <div className="flex flex-col w-full  rounded-2xl shadow shadow-gray-600 bg-gray-800  justify-between h-full " >
      {/* amount */}
      <div className="p-6  z-10">
        <div className="font-semibold text-center my-6 text-cyan-500 hidden md:flex">交易面板</div>
        <div className="space-y-1 bg-gray-900  rounded-2xl p-6">
          <div className='text-xs'>
            <span className=' text-gray-500'>可用：</span>
            <span>1000 USDT</span>
          </div>
          <div className="flex flex-row space-x-1">
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white w-1/4 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <input type='number' className="form-input  border border-cyan-500 text-white placeholder-purple-400 w-2/4  " />
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white  w-1/4  ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="flex flex-row h-12 space-x-1 font-bold text-lg">
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white w-1/3 ">+5</button>
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white w-1/3  ">+10</button>
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white w-1/3  ">+20</button>
          </div>
          <div className="flex flex-row  h-12  space-x-1 font-bold text-lg">
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white w-1/3  ">+50</button>
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white w-1/3  ">+100</button>
            <button className="btn-lg bg-cyan-800 hover:bg-cyan-600 active:bg-cyan-800 text-white w-1/3  ">ALL</button>
          </div>
        </div>
        
      </div>
      {/* buy and sell */}
      <div className='relative'>
        <div className='flex flex-col w-full items-center '>
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> */}
          <div className='text-xs text-cyan-500  z-10'>{countdown?'等待时间':"做比交易吧"}</div>
          <div className='text-white space-x-2  z-10'>
            <span className='text-2xl font-bold '>{countdown || buyCountdown}</span>
            <span>S</span>
          </div>
        </div>
        
        <div className='flex flex-col  mt-6 '>


          <div className='flex flex-row gap-4 text-white p-6'>
            <button className="btn  bg-teal-500 w-full  disabled:cursor-not-allowed	disabled:bg-gray-400 z-10" disabled={countdown != null}>
              买
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </button>
            <button className="btn  bg-red-500  w-full  disabled:cursor-not-allowed	disabled:bg-gray-400 z-10" disabled={countdown != null}>
              卖
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </button>
          </div>

        </div>
        <div className='absolute inset-0 flex flex-row  w-full h-full '>
            <div className='w-full h-full rounded-bl-2xl bg-teal-600/20 ' style={{width:buyRadio+'%'}}>
            </div>
            {/*   */}
            
            <div className=' w-full h-full bg-gradient-to-r from-teal-600/20 to-red-500/20' style={{width:'15%'}}>
              
              <div className='h-full w-1/2  border-r-2 border-white animate-pulse items-end flex flex-row justify-end relative'>
                <div className='font-bold absolute inset-x-3 -top-5'>
                40%
                </div>
              </div>
            </div>
            <div className='w-full h-full rounded-br-2xl  bg-red-600/20 text-right' style={{width:100-buyRadio+'%'}}></div>
          </div>
      </div>

    </div>
  );
}

export default BetView;
