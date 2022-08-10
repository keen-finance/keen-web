import React,{ useState, useRef, useEffect } from 'react';
import usdtLogo from '../../images/token/usdt.png';
import keenLogo from '../../images/token/keen.jpg';
import Dropdown from '../../utils/Dropdown';
import Banner from '../Banner';
import Tooltip from '../Tooltip';
import { useForm,useWatch, useController,SubmitHandler,Controller } from "react-hook-form";

type Inputs = {
  outRadio: number
};
const defaultValues = {
  outRadio: 0
};

function RemoveLiquidity() {


  const { register, handleSubmit, watch,getValues,setValue,control, formState: { errors,isSubmitting, isDirty, isValid } } = useForm<Inputs>({defaultValues,});

  // const { field, fieldState } = useController({name:'outRadio',control:control});

  const [balanceLp,setBalanceLp] = useState(1000)
  const [balanceLpLock,setBalanceLpLock] = useState(100)
  const [balanceLpOut,setBalanceLpOut] = useState(0)
  
  const outRadio = useWatch({ control,name: 'outRadio' });
  const [bannerWarningOpen,setBannerWarningOpen]  = useState(false);
  const [shakeX,setShakeX]  = useState(false);


  const [submittingId,setSubmittingId] = useState()

  const submit1Loading = submittingId == 'submit1' && isSubmitting;
  const submit2Loading = submittingId == 'submit2' && isSubmitting;


  const submit1Disabled = submit1Loading || !isDirty || (submittingId && !isValid);
  const submit2Disabled = submit2Loading || !isDirty || !isValid || bannerWarningOpen;

  useEffect(()=>{
    if(errors.outRadio){
      setShakeX(true);
      setTimeout(()=>{setShakeX(false)},1000)
    }
  },[errors.outRadio])

  const onSubmit: SubmitHandler<Inputs> = async (data,event) => {
    const { id } = event.nativeEvent.submitter; // <-- access submitter id
    
    setSubmittingId(id)

    await new Promise(r => setTimeout(r, 3000));
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
    let out = balanceLp * outRadio / 100;
    setBalanceLpOut(out);
    if(out > (balanceLp-balanceLpLock)){
      setBannerWarningOpen(true)
    }else{
      setBannerWarningOpen(false)
    }
  },[outRadio])
  
  function setMax(){
    let value = 100-(balanceLpLock/balanceLp*100)
    
    setValue("outRadio",value)
  }

  function approve(){
    console.log('approve')
  }


  return (
    <div className="flex ">
      <form className="w-full mx-3 md:mx-12 my-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* input-1 */}
        <div className={`w-full ${shakeX && 'animate-shakeX'}`}>

          <label className='flex text-sm font-medium ml-2 justify-between' htmlFor="committee">
            <div className='font-bold text-cyan-600'>
            金额
            </div>
            <div className='font-bold text-red-500'>
              {errors.outRadio && errors.outRadio.message}
            </div>
          </label>

          <Controller
          
            name="outRadio"
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
                value: 100,
                message: 'Cannot be higher than 100',
              },
              validate: {
                lessUnLockBalance: v => (balanceLp * v / 100) <= (balanceLp-balanceLpLock) || 'Cannot contain unreleased committees',
              }
            }}
            render={({ field }) => 
            <div className={`flex flex-col bg-slate-700 rounded-2xl space-y-8 p-3 ${errors.outRadio && 'border-4 border-red-500'}`}>
              <div className='font-bold text-4xl'>
                {field.value}%
              </div>
              <div className='relative'>
                <div className='w-full h-2 rounded-lg bg-purple-600 absolute top-3 left-0 z-10' style={{'width':(field.value<=30?(Number(field.value)+5):(field.value>=60?Number(field.value)-1:field.value))+'%'}}></div>
                <input id="outRadio" name='outRadio' type="range" min="0" max='100' className="w-full outline-0 bg-gray-900 appearance-none text-purple-600"  {...field} />
              </div>
              
              <div className='flex text-sm items-center justify-around space-x-2 w-full'>
                <div onClick={()=>setValue("outRadio",25, { shouldDirty: true,shouldValidate:true })} className='font-semibold items-center cursor-pointer justify-center bg-gray-700 hover:bg-gray-800 rounded-2xl text-purple-600 hover:text-purple-700 duration-150 ease-in-out px-3 py-1'>
                25%
                </div>
                <div onClick={()=>setValue("outRadio",50, { shouldDirty: true,shouldValidate:true })} className='font-semibold items-center cursor-pointer justify-center bg-gray-700 hover:bg-gray-800  rounded-2xl text-purple-600 hover:text-purple-700 duration-150 ease-in-out px-3 py-1'>
                50%
                </div>
                <div onClick={()=>setValue("outRadio",75, { shouldDirty: true,shouldValidate:true })} className='font-semibold items-center cursor-pointer justify-center bg-gray-700 hover:bg-gray-800 rounded-2xl text-purple-600 hover:text-purple-700 duration-150 ease-in-out px-3 py-1'>
                75%
                </div>
                <div onClick={()=>setValue("outRadio",100, { shouldDirty: true,shouldValidate:true })} className='font-semibold items-center cursor-pointer justify-center bg-gray-700 hover:bg-gray-800 rounded-2xl text-purple-600 hover:text-purple-700 duration-150 ease-in-out px-3 py-1' >
                100%
                </div>
              </div>
            </div>
            }
          />
        </div>
        
        {
          bannerWarningOpen && 
          <div className={`flex flex-col item-center space-y-3 ${shakeX && 'animate-shakeX'}`}>
            <Banner type="warning" open={bannerWarningOpen} setOpen={setBannerWarningOpen} className="" data-aos="fade-up" data-aos-delay="200" hasClose={false}>
              {`需要保留委员会冻结的 ${balanceLpLock} 枚LP`}
            </Banner>
            <button type='button' onClick={()=>setMax()} className='w-32 mx-auto font-semibold  cursor-pointer border-4 border-amber-600 hover:border-amber-700 text-amber-600  rounded-2xl text-amber-600 hover:text-amber-700 duration-150 ease-in-out px-3 py-1' >
            好的
            </button>
          </div>
        }
        <div className='w-full'>
          <label className='text-sm font-medium ml-2 text-cyan-600' htmlFor="committee">
            接收
          </label>
          <div className='p-3 space-y-3 rounded rounded-xl bg-gray-900'> 
            <div className="flex items-center w-full justify-between">
              <div className='flex items-center'>
                <img className="rounded-full shrink-0  w-4 bg-white" src={usdtLogo} />
                <img className="rounded-full shrink-0 mr-1 w-4  bg-white" src={keenLogo}  />
                <span  className="text-slate-500  transition duration-150 ease-in-out">USDT-KEEN LP:</span>
              </div>
              <span className="">{balanceLpOut}</span>
            </div>
            <div className="flex items-center w-full justify-between">
              <div className='flex items-center'>
                <img className="rounded-full shrink-0 mr-1 w-6 bg-white" src={usdtLogo} />
                <span  className="text-slate-500  transition duration-150 ease-in-out">USDT:</span>
              </div>
              <span className="">1,000</span>
            </div>
            <div className="flex items-center w-full justify-between">
              <div className='flex items-center'>
                <img className="rounded-full shrink-0 mr-1 w-6  bg-white" src={keenLogo}  />
                <span  className="text-slate-500 transition duration-150 ease-in-out">KEEN:</span>
              </div>
              <span className="">1,000</span>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <label className='text-sm font-medium ml-2 text-cyan-600' htmlFor="committee">
            剩余
          </label>
          <div className='p-3 space-y-3 rounded rounded-xl bg-gray-900'> 
            {/* <div className="flex items-center w-full justify-between">
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
                <span  className="text-slate-500  transition duration-150 ease-in-out">USDT:</span>
              </div>
              <span className="">1,000</span>
            </div>
            <div className="flex items-center w-full justify-between">
              <div className='flex items-center'>
                <img className="rounded-full shrink-0 mr-1 w-6  bg-white" src={keenLogo}  />
                <span  className="text-slate-500 transition duration-150 ease-in-out">KEEN:</span>
              </div>
              <span className="">1,000</span>
            </div> */}
            <div className="flex items-center w-full justify-between">
              <div className='flex items-center'>
                <span  className="text-slate-500 transition duration-150 ease-in-out">流动池中的份额:</span>
              </div>
              <span className="">91%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-nowrap space-x-6">
          <button id="submit1"  className="btn font-semibold text-white text-center bg-purple-600 hover:bg-purple-700 w-full cursor-pointer rounded-2xl disabled:cursor-not-allowed	disabled:opacity-25"  onClick={()=>approve} disabled={submit1Disabled}>
            <svg className={`animate-spin w-4 h-4 fill-current shrink-0 mr-1  ${ submit1Loading ? 'flex':'hidden' }`} viewBox="0 0 16 16">
              <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
            </svg>
            启用
          </button>
          <button id="submit2"  type="submit" className="btn font-semibold text-white text-center bg-purple-600 hover:bg-purple-700 w-full cursor-pointer rounded-2xl disabled:cursor-not-allowed	disabled:opacity-25"  disabled={submit2Disabled}>
            <svg className={`animate-spin w-4 h-4 fill-current shrink-0 mr-1  ${ submit2Loading ? 'flex':'hidden' }`} viewBox="0 0 16 16">
              <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
            </svg>
            {
              isDirty ? '移除' : '输入金额'
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default RemoveLiquidity;
