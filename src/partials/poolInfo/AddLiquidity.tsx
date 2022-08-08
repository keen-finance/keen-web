import React,{ useState, useRef, useEffect } from 'react';
import usdtLogo from '../../images/token/usdt.png';
import keenLogo from '../../images/token/keen.jpg';
import Dropdown from '../../utils/Dropdown';
import Banner from '../Banner';
import Tooltip from '../Tooltip';
import { useForm,useWatch, SubmitHandler,Controller } from "react-hook-form";

type Inputs = {
  inAmount0: number,
  inAmount0Required: string,
  inAmount1: number,
  inAmount1Required: string,
  committee:boolean,
  committeeRequired: string,
};
const defaultValues = {
  committee: false,
  
};

function AddLiquidity() {
  const { register, handleSubmit, watch,setValue,control, formState: { errors } } = useForm<Inputs>({defaultValues});
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const [balance0,setBalance0] = useState(100)
  const [balance1,setBalance1] = useState(200)
  const [shareOfPool,setShareOfPool] = useState(99)
  
  const inAmount0 = useWatch({ control,name: 'inAmount0' });
  const committee = useWatch({ control,name: 'committee' });
  const [bannerWarningOpen,setBannerWarningOpen]  = useState(false);
  
  useEffect(()=>{
    if(inAmount0 >= 5000 && !committee){
      setValue('committee',true)
      setBannerWarningOpen(true)
    }
    if(!inAmount0 || inAmount0 < 5000){
      setValue('committee',false)
      
      setBannerWarningOpen(false)
    }
  },[inAmount0])

  function onMaxClick(index) {
    if(index == 0){
      setValue('inAmount0',balance0)
    }
    if(index == 1){
      setValue('inAmount1',balance1)
    }
  }
  return (
    <div className="flex ">
      <form className="w-full mx-3 md:mx-12 my-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* input-1 */}
        <div className="flex flex-wrap ">
          <div className="w-full">
            <label className="flex font-medium  justify-between" htmlFor="inAmount0">
              <div className='flex items-center space-x-2'>
                <div className='bg-gray-900 border-t border-x border-slate-700 rounded-t-2xl flex p-2'>
                  <img src={keenLogo} className='h-8 w-8 bg-white rounded-full'/>
                  {/* <span className='font-bold text-2xl'>KEEN</span> */}
                  <Dropdown title={"KEEN"} icon='select'>
                    <li onClick={() => {
                      
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer" >
                        
                        <img src={keenLogo} className='h-4 w-4 bg-white rounded-full'/>
                        KEEN
                      </div>
                    </li>
                    <li onClick={() => {
                      
                    }}>
                      <div className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight cursor-pointer">
                        
                        <img src={keenLogo} className='h-4 w-4 bg-white rounded-full'/>
                        WKEEN
                      </div>
                    </li>
                  </Dropdown>
                </div>
                <div className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className='cursor-pointer'>
                  <svg fill="none" className="h-6 w-6" viewBox="0 0 35 33"  xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25"><path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726"/><g fill="#e27625" stroke="#e27625"><path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z"/><path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z"/><path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z"/><path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z"/><path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z"/><path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z"/><path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z"/></g><path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2"/><path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2"/><path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447"/><path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447"/><path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228"/><path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228"/><path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228"/><path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228"/><path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525"/><path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525"/><path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525"/><path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525"/><path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f"/><path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f"/><path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d"/><path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616"/><path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a"/><path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a"/><path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f"/><path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f"/><path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f"/></g>
                  </svg>
                </div>
              </div>
              <div className='flex items-center'>
                余额: {balance0}
              </div>
            </label>
            <Controller
              name="inAmount0"
              control={control}
              render={({ field }) => <input id="inAmount0" name='inAmount0' type="number" className="form-input w-full text-white text-lg bg-slate-700 border-none text-right rounded-tr-2xl" placeholder="0.0" {...field} />}
            />
             
            <div className='flex text-sm items-center justify-end space-x-2 w-full bg-slate-700 rounded-b-2xl p-3'>
              <div className=' '>
              ~412.29 USD
              </div>
              <div onClick={()=>onMaxClick(0)} className='font-semibold items-center cursor-pointer justify-center border-4 border-purple-600 hover:border-purple-700  rounded-2xl text-purple-600 hover:text-purple-700 duration-150 ease-in-out px-2' >
                最大
              </div>
            </div>
          </div>
        </div>
        
        <div className='flex justify-center '>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        {/* input-2 */}
        <div className="flex flex-wrap ">
          <div className="w-full">
            <label className="flex font-medium  justify-between" htmlFor="inAmount1">
              <div className='flex items-center space-x-2'>
                <div className='bg-gray-900 border-t border-x border-slate-700 rounded-t-2xl flex p-2 items-center'>
                  <img src={usdtLogo} className='mr-4 h-8 w-8 bg-white rounded-full'/>
                  <span className=''>USDT</span>
                </div>
                <div className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className='cursor-pointer'>
                  <svg fill="none" className="h-6 w-6" viewBox="0 0 35 33"  xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25"><path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726"/><g fill="#e27625" stroke="#e27625"><path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z"/><path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z"/><path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z"/><path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z"/><path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z"/><path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z"/><path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z"/></g><path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2"/><path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2"/><path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447"/><path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447"/><path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228"/><path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228"/><path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228"/><path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228"/><path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525"/><path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525"/><path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525"/><path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525"/><path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f"/><path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f"/><path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d"/><path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616"/><path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a"/><path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a"/><path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f"/><path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f"/><path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f"/></g>
                  </svg>
                </div>
              </div>
              <div className='flex items-center'>
                余额: {balance1}
              </div>
            </label>
            <Controller
              name="inAmount1"
              control={control}
              render={({ field }) => <input id="inAmount1" name='inAmount1' type="number" className="form-input w-full text-white text-lg bg-slate-700 border-none text-right rounded-tr-2xl" placeholder="0.0" {...field} />}
            />
            <div className='flex text-sm items-center justify-end space-x-2 w-full bg-slate-700 rounded-b-2xl p-3'>
              <div className=''>
              ~412.29 USD
              </div>
              <div onClick={()=>onMaxClick(1)}  className='font-semibold items-center cursor-pointer justify-center border-4 border-purple-600 hover:border-purple-700  rounded-2xl text-purple-600 hover:text-purple-700 duration-150 ease-in-out px-2' >
                最大
              </div>
            </div>
          </div>
        </div>
        {/* {
          bannerWarningOpen && 
          <Banner type="warning" open={bannerWarningOpen} setOpen={setBannerWarningOpen} className="" data-aos="fade-up" data-aos-delay="200">
              {`供应 >= 5000 KEEN 即可成为委员会成员`}
          </Banner>
          
            
         
        } */}
        {/* committee */}
        <div className='flex items-end justify-between'>
          <label className='' htmlFor="committee">
            <Tooltip bg={"dark"} title={'成为委员会'} textColor='text-cyan-600' position='top' outerFocus={bannerWarningOpen}>
              <div className="text-xs whitespace-nowrap">{`供应 >= 5000 KEEN 即可成为委员会成员，若不需要请手动取消`}</div>
            </Tooltip>

          </label>
          <div className="form-switch">
            
            <Controller
              name="committee"
              control={control}
              render={({ field }) => (
                <>
                <input type="checkbox" id="committee" className="sr-only" disabled={!watch('inAmount0') || watch('inAmount0') < 5000} onChange={(e) => field.onChange(e.target.checked)} checked={field.value} {...register("committee")}/>
                <label className="bg-slate-400" htmlFor="committee">
                  <span className="bg-white shadow-sm" aria-hidden="true"></span>
                  <span className="sr-only">Switch label</span>
                </label>
                </>

              )}
            />
            
          </div>
        </div>
        {/* Share of Pool */}
        <div className='flex items-end justify-between'>
          <label className='text-sm font-medium ml-2 text-cyan-600' htmlFor="committee">
            流动池的份额
          </label>
          <div className="font-bold text-purple-600">
            {shareOfPool} %
          </div>
        </div>


        
        <div className="flex flex-wrap  mt-6">
          <div className="w-full ">
            <input type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full cursor-pointer" value='供应'/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddLiquidity;
