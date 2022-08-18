import React,{ useState, useRef, useEffect } from 'react';
import keenLogo from '../../images/token/keen.jpg';
import usdtLogo from '../../images/token/usdt.png';
import { useForm,useWatch, useController,SubmitHandler,Controller } from "react-hook-form";

type Inputs = {
  inputAmount: number
};
const defaultValues = {
  inputAmount: 0
};

function BetView() {
  const { register, handleSubmit, watch,getValues,setValue,control, formState: { errors,isSubmitting, isDirty, isValid } } = useForm<Inputs>({defaultValues,});
  const [balance, setBalance] = useState(100);
  const [betStartTime, setBetStartTime] = useState(Number);
  const [buyRadio, setBuyRadio] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [buyCountdown, setBuyCountdown] = useState(0);

  const [lonsShortChange, setLonsShortChange] = useState(0);

  const [betRadio, setBetRadio] = useState(0);



  const onSubmit: SubmitHandler<Inputs> = async (data,event) => {
    const { id } = event.nativeEvent.submitter; // <-- access submitter id
    
    

    
    if(id && handlers[id]){
      handlers[id](data,event); // <--proxy event to proper callback handler
    }
  };

  const  handlesubmit_task1  : SubmitHandler<Inputs> = (data,event) => {
    event.preventDefault();


    console.log("handler 1", data);
    
    event.target.reset();
  }
  
  const handlesubmit_task2: SubmitHandler<Inputs> = (data,event) => {
    event.preventDefault();
    console.log("handler =2", data);
    event.target.reset();
    
  }
  const handlers = {
    submit1: handlesubmit_task1,
    submit2: handlesubmit_task2,
  }


  useEffect(()=>{
    let interval2
    if(countdown > 0){
      interval2 = setTimeout(function(){
        setCountdown(countdown-1)
      },1000)
    }else if(countdown == 0){
      setCountdown(null)
      setBuyCountdown(30)
    }
    return () =>{
      clearInterval(interval2)
    }
  },[countdown])

  useEffect(()=>{
    
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
    let value = buyRadio
    let valueUpdate = 1
    let interval1 = setInterval(function(){
      if(value == 0){
        valueUpdate = 1;
      }
      if(value == 100){
        valueUpdate = -1;
      }
      if(valueUpdate > 0){
        setLonsShortChange(1);
      } else if(valueUpdate < 0){
        setLonsShortChange(2);
      }
      value = value+valueUpdate;
      setBuyRadio(value);
      setTimeout(function(){
        setLonsShortChange(0);
      },3000)
      
    },5000)
    return () =>{
      clearInterval(interval1)
      clearInterval(interval2)
    }
  },[])
  
  useEffect(()=>{
    setValue('inputAmount',balance*betRadio/100, { shouldDirty: true,shouldValidate:true })
  },[betRadio,balance])
  function random(min, max) {
 
    return Math.floor(Math.random() * (max - min)) + min;
   
  }

  let betRadioAdd = betRadio < 20 ? 5 : betRadio < 36 ? 2 : betRadio >= 81 ? -5 : 0;
  return (
    <form className="flex flex-col w-full  rounded-2xl shadow shadow-gray-600 bg-gray-800  justify-between h-full " onSubmit={handleSubmit(onSubmit)}>
      {/* amount */}
      <div className="p-6  ">
        <div className="font-semibold text-center my-6 text-cyan-500 hidden md:flex">交易面板</div>
        <div className='text-xs space-x-1 mb-3'>
          <span className='text-gray-500'>可用</span>
          <span>{balance} USDT</span>
        </div>
        <Controller
          name="inputAmount"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            min: {
              value: 1,
              message: 'Cannot be lower than 1',
            },
            max: {
              value: balance,
              message: 'Cannot be grater than balance',
            }
            
          }}
          render={({ field }) => 
            <div className='flex w-full focus-within:ring-1 focus-within:ring-cyan-500  hover:ring-1 hover:ring-cyan-500 rounded-lg bg-gray-900 px-1  mb-3'>
              <div className='w-12 h-full my-auto text-gray-500'>
                数量
              </div>
              <input id="inputAmount" name='inputAmount'  type='number' className="form-input text-white placeholder-purple-400 text-right w-full border-none"  {...field}/>
              <div className='w-12 h-full my-auto text-cyan-500'>
                USDT
              </div>
            </div>
          }
        />
        {/* range */}
        <div className='relative  items-center  text-center  mb-3'>
          <div className='w-full h-2  absolute top-3 left-0' style={{'width':betRadioAdd+betRadio+'%'}}>
            <div className='w-full h-full rounded-lg bg-purple-600'>

            </div>
          </div>
          <div className='w-full absolute flex justify-between top-2 px-2'>
            <button className={`w-4 h-4 border-4 mx-1 md:hover:-mt-1 md:hover:mx-0 md:hover:w-6 md:hover:h-6  md:hover:bg-white ${betRadio >=0?"border-purple-600 bg-white":"border-gray-900 bg-gray-800"}`} onClick={()=>{setBetRadio(0)}}></button>
            <button className={`w-4 h-4 border-4 mx-1 md:hover:-mt-1 md:hover:mx-0 md:hover:w-6 md:hover:h-6  md:hover:bg-white ${betRadio >=25?"border-purple-600 bg-white":"border-gray-900 bg-gray-800"}`} onClick={()=>{setBetRadio(25)}}></button>
            <button className={`w-4 h-4 border-4 mx-1 md:hover:-mt-1 md:hover:mx-0 md:hover:w-6 md:hover:h-6  md:hover:bg-white ${betRadio >=50?"border-purple-600 bg-white":"border-gray-900 bg-gray-800"}`} onClick={()=>{setBetRadio(50)}}></button>
            <button className={`w-4 h-4 border-4 mx-1 md:hover:-mt-1 md:hover:mx-0 md:hover:w-6 md:hover:h-6  md:hover:bg-white ${betRadio >=75?"border-purple-600 bg-white":"border-gray-900 bg-gray-800"}`}  onClick={()=>{setBetRadio(75)}}></button>
            <button className={`w-4 h-4 border-4 mx-1 md:hover:-mt-1 md:hover:mx-0 md:hover:w-6 md:hover:h-6  md:hover:bg-white ${betRadio >=100?"border-purple-600 bg-white":"border-gray-900 bg-gray-800"}`}  onClick={()=>{setBetRadio(100)}}></button>
          </div>
          
          <input id="betRadio" name='betRadio' type="range" min="0" max='100' className="w-full  outline-0 bg-gray-900 appearance-none text-purple-600" value={betRadio} onChange={(e)=>{setBetRadio(Number(e.target.value))}}  />
          <div className='text-gray-500'>{betRadio} %</div>

        </div>
        {/* 利润 */}
        <div className='flex flex-row justify-between'>
          <div className='text-sm text-gray-500'>
            利润95%
          </div>
          <div className='text-cyan-500 font-bold'>
            +{getValues('inputAmount')*195/100} USDT
          </div>
        </div>
      </div>

      {/* buy and sell */}
      <div className='relative'>
        {/* 等待提示 */}
        <div className='flex flex-col w-full items-center '>
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> */}
          <div className={``}>{countdown?'等待时间':"做比交易吧"}</div>
          <div className={`space-x-2   ${countdown?'text-red-600':'text-teal-600'}`}>
            <span className='text-2xl font-bold '>{countdown || buyCountdown}</span>
            <span>S</span>
          </div>
        </div>
        {/* 按钮 */}
        <div className='flex flex-col  mt-6 '>
          <div className='flex flex-row gap-4 text-white p-6'>
            <button id='submit1' type='submit' className="btn  bg-teal-500 w-full  disabled:cursor-not-allowed disabled:opacity-50 z-10" disabled={countdown != null}>
              买
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </button>
            <button id='submit2' type='submit' className="btn  bg-red-500  w-full  disabled:cursor-not-allowed disabled:opacity-50  z-10" disabled={countdown != null}>
              卖
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </button>
          </div>
        </div>
        {/* 多空比 */}
        <div className='absolute inset-0 flex flex-row  w-full h-full text-xs rounded-t-2xl border-t border-t-gray-500'>
          <div className='w-full h-full rounded-bl-2xl bg-teal-600/20 rounded-tl-2xl' style={{width:buyRadio+'%'}}>
            <div className={`m-1 ${lonsShortChange == 1?'text-teal-600':''}`}>
              {buyRadio}%
            </div>
          </div>
          <div className=' w-full h-full bg-gradient-to-r from-teal-600/20 to-red-600/20' style={{width:'15%'}}>
            <div className={`h-full w-1/2  border-r-2 border-white items-end flex flex-row justify-end relative ${lonsShortChange==1?'animate-pulse text-teal-600 border-teal-600 border-r-4':lonsShortChange==2?'animate-pulse text-red-600 border-red-600 border-r-4':''}`}>
              <div className=' absolute inset-x-0 -top-5 w-16'>
              用户多空比
              </div>
            </div>
          </div>
          <div className='w-full h-full rounded-br-2xl  bg-red-600/20 text-right rounded-tr-2xl' style={{width:100-buyRadio+'%'}}>
            <div className={`m-1 ${lonsShortChange == 2?'text-red-600':''}`}>
            {100-buyRadio}%
            </div>
          </div>
        </div>
      </div>

    </form>
  );
}

export default BetView;
