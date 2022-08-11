import React,{ useState, useRef, useEffect } from 'react';

import AppHeader from '../partials/AppHeader';
import PageIllustration from '../partials/PageIllustration';
import BetResult from '../partials/BetResult';

import Footer from '../partials/Footer';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Config from '../settings'
import generatedKLineDataList from '../utils/generatedKLineDataList'
import { init, dispose } from 'klinecharts'
import { useWeb3React } from "@web3-react/core";
import AppPageHeader from '../partials/AppPageHeader';
import TradeInfo from '../partials/trade/TradeInfo';

const textColorDark = '#ffff'
const gridColorDark = '#3a3a3acc'
const axisLineColorDark = '#ffff'
const crossTextBackgroundColorDark = '#373a40'

const textColorLight = '#76808F'
const gridColorLight = '#ededed'
const axisLineColorLight = '#DDDDDD'
const crossTextBackgroundColorLight = '#686d76'

function getThemeOptions (theme) {
  const textColor = theme === 'dark' ? textColorDark : textColorLight
  const gridColor = theme === 'dark' ? gridColorDark : gridColorLight
  const axisLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
  const crossLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
  const crossTextBackgroundColor = theme === 'dark' ? crossTextBackgroundColorDark : crossTextBackgroundColorLight
  return {
    grid: {
      horizontal: {
        color: gridColor
      },
      vertical: {
        show:false,
        color: gridColor
      }
    },
    candle: {
      priceMark: {
        
        high: {
          show: false
        },
        low: {
          show: false
        },
        last: {
          upColor: '#26A69A',
          downColor: '#EF5350',
          noChangeColor: '#888888',
          line: {
            show: true,
            // 'solid'|'dash'
            style: 'solid',
            dashValue: [8, 8],
            size: 1,
            color: ''
          },
          text: {
            show: true,
            // size: 18,
            paddingLeft: 4,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            color: '#FFFFFF',
            family: 'Helvetica Neue',
            // weight: 'bold',
            borderRadius: 2
          }
        }
      },
      tooltip: {
        showRule: 'follow_cross',
        showType: 'rect',
        // text: {
        //   color: textColor
        // },
        labels:  ['T: ', 'O: ', 'C: ', 'H: ', 'L: ', 'V: '],
        rect: {
          // paddingLeft: 0,
          // paddingRight: 0,
          // paddingTop: 10,
          // paddingBottom: 6,
          offsetLeft: 1,
          offsetTop: 50,
          offsetRight: 0,
          borderRadius: 4,
          borderSize: 1,
          borderColor: '#3f4254',
          backgroundColor: 'rgba(17, 17, 17, .3)'
        },
        text: {
          size: 12,
          family: 'Helvetica Neue',
          weight: 'normal',
          color: '#ffff',
          marginLeft: 8,
          marginTop: 6,
          marginRight: 8,
          marginBottom: 0
        }
      },
      bar: {
        upColor: '#26A69A',
        downColor: '#EF5350',
        noChangeColor: '#888888'
      },
    },
    technicalIndicator: {
      tooltip: {
        text: {
          color: textColor
        }
      }
    },
    xAxis: {
      axisLine: {
        color: axisLineColor
      },
      tickLine: {
        color: axisLineColor
      },
      tickText: {
        color: textColor
      }
    },
    yAxis: {
      width: 80,
      axisLine: {
        color: axisLineColor,
        // length: 5,
      },
      tickLine: {
        color: axisLineColor,
      },
      tickText: {
        color: textColor,
        // size: 12,
        // weight: 'bold',
        // family: 'Helvetica Neue',
      }
    },
    separator: {
      size: 1,
      color: axisLineColor,
      fill: false,
      activeBackgroundColor: 'rgba(230, 230, 230, .15)'
    },
    crosshair: {
      horizontal: {
        line: {
          color: crossLineColor
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        }
      },
      vertical: {
        line: {
          color: crossLineColor
        },
        text: {
          backgroundColor: crossTextBackgroundColor
        }
      }
    }
  }
}


const themes = [
  { key: 'dark', text: '深色' },
  { key: 'light', text: '浅色' }
]


function Trade() {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();

  const [webSocketUrl,setWebSocketUrl] = useState(Config[Config.NODE_ENV].VUE_APP_SOCKET_API+'/webSocket/tourists');
  useEffect(() => {
    console.log("122323",account)
    if(account){
      setWebSocketUrl(Config[Config.NODE_ENV].VUE_APP_SOCKET_API+'/webSocket/'+account)
    }
  },[account]);
  
  const webSocket = useWebSocket(webSocketUrl,{},true);
  const [sidebarOpen, setSidebarOpen] = useState(false)


  const chart = useRef()
  const paneId = useRef()

  const websocket = useRef()

  const [theme, setTheme] = useState('dark')

  const [height, setHeight] = useState(0); 

  const [circleInitData, setCircleInitData] = useState([])
  const [circlelastData, setCircleLastData] = useState()


  // 订单
  const [orderTabIndex, setOrderTabIndex] = useState(0)
 
  function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}


  const resizeUpdate = (e) => {
      // 通过事件对象获取浏览器窗口的高度
      let h = e.target.innerHeight;
      setHeight(h);
      chart.current.resize();
  }

  useEffect(() => {
    // 页面刚加载完成后获取浏览器窗口的大小
    let h = window.innerHeight;
    setHeight(h)

    // 页面变化时获取浏览器窗口的大小 
    window.addEventListener('resize', resizeUpdate);

    return () => {
        // 组件销毁时移除监听事件
        window.removeEventListener('resize', resizeUpdate);
    }
  }, []);


  useEffect(() => {
    
    let current = init('custom-style-k-line')    
    // paneId.current = chart.current.createTechnicalIndicator('VOL', false,{ 'dragEnbaled':false})
    current.setZoomEnabled(false)
    current.setScrollEnabled(false)
    current.setDataSpace(15)
    current.setOffsetRightSpace(0);
    current.setStyleOptions(getThemeOptions(theme))

    generatedKLineDataList().then(data => {
      let list = data.content;
      for (let index = 0; index < list.length; index++) {
        list[index].timestamp = list[index].id
      }
      current.applyNewData(list.reverse())
      setCircleInitData(list.reverse())
    })
    chart.current = current
    return () => {
      dispose('custom-style-k-line')
    }
  }, [])

  useEffect(() =>{
    if(!webSocket.lastJsonMessage){
      return;
    }
    if(!chart.current){
      return;
    }
    if(!chart.current.getDataList()){
      return;
    }
    const data = webSocket.lastJsonMessage
    

    if (data.msgType === 'KLINE') {
      let obj = JSON.parse(data.msg)
      obj.timestamp = obj.id
      chart.current.updateData(obj)
    } else if(data.msgType === 'KLINE_RESULT'){
      setCircleLastData(data.msg);
    }
  },[webSocket.lastJsonMessage,chart.current])

  useEffect(() =>{
    if(webSocket.readyState == ReadyState.OPEN && chart.current){
      webSocket.sendMessage('kline')
    }
  },[webSocket.readyState,chart.current])



  return (
    <div className="flex flex-col  min-h-screen overflow-hidden font-kanit">

      {/*  Site header */}
      <AppHeader current='trade'/>

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-7xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        {/* <AppPageHeader>

        </AppPageHeader> */}

        <TradeInfo/>
        <div className="max-w-7xl mx-auto px-0 sm:px-0  flex flex-row h-screen  pt-16">
          <div className='relative w-full border border-gray-700'>
            <div className="btn bg-black/20  border border-gray-700  text-white absolute  z-10 font-bold  ">
              BTC/USD
            </div>
            {/* Content */}
            <div className="h-full w-full">
              {/* kline top */}
              <div className='h-3/5 lg:h-2/3 sm:h-3/5'>
                <div  id="custom-style-k-line" className="k-line-chart  bg-no-repeat bg-cover h-full bg-cover bg-center bg-[url('/src/images/worldmap.png')]" >
                </div>
              </div>
              {/* kline bottom */}
              <div className="flex flex-col rounded-sm  h-2/5 lg:h-1/3 sm:h-2/5">
                
                <div className=' flex flex-col  h-full'>
                  {/* 圆圈 */}
                  <BetResult initData={circleInitData} lastData={circlelastData}/>
                  
                  {/* 操作 */}
                  <div className="md:hidden  h-4/6">
                    
                    <div className='h-2/5'>
                      {/* 利润 */}
                      <div className='justify-center flex h-5'>
                        <div className="text-white  ">利润 95%</div>
                        <div className="text-teal-500  font-bold ">+$1000</div>
                      </div>
                      {/* 加减 */}
                      <div className="flex flex-wrap">
                        <button className="btn  bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none  first:rounded-l last:rounded-r z-10 w-1/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <input className="form-input  rounded-none  w-2/4 border-1 border-slate-800 hover:border-slate-800 focus:border-slate-800" />
                        <button className="btn  bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent  w-1/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* 买卖 */}
                    <div className='h-3/5'>
                      {/* 情绪 */}
                      <div className="relative w-full  bg-red-500 text-right text-white rounded-t h-5">
                        40%
                        <div className="absolute inset-0 bg-teal-500  text-left text-white rounded-tl" aria-hidden="true" style={{ width: '50%' }} >60%</div>
                      </div>
                      {/* 按钮 */}
                      <div className='flex flex-nowrap h-5/6'>
                          <button className="btn lg:btn-lg h-full bg-teal-500 hover:bg-teal-600 text-white text-2xl w-1/3 rounded-none ">
                            买
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </button>
                          
                          <button className="btn lg:btn-lg h-full border-slate-200 bg-slate-100 text-slate-400 w-1/3 flex flex-wrap " disabled>
                            <div>
                              等待时间
                            </div>
                            <div className='text-3xl'>
                            15 s
                            </div>
                          
                          </button>
                          
                          <button className="btn lg:btn-lg h-full  bg-red-500 hover:bg-red-600 text-white  text-2xl w-1/3 rounded-none">
                            卖
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                          </button>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* desktop right */}
          
          <div className=" lg:shrink-0 h-screen pt-18 hidden md:flex">
            <div className="py-8 px-4 lg:px-8 border h-full border-gray-700 overflow-y-auto" >
              <div className="max-w-sm mx-auto lg:max-w-none ">
                {/* Credit Card */}
                
                {/* Details */}
                <div className="mt-6 h-1/6">
                  <div className=" font-semibold text-center mb-6  text-white">交易面板</div>

                  <div className="pb-4  space-y-1">

                    
                    <div className="flex flex-wrap -space-x-px">
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none  first:rounded-l last:rounded-r w-1/4 flex justify-center">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <input className="form-input appearance-none bg-slate-800 border border-purple-500 focus:border-purple-300 text-white placeholder-purple-400 w-2/4 z-10" />
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent  w-1/4  flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap -space-x-px h-12">
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent w-1/3  font-bold text-lg ">+5</button>
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent  w-1/3 font-bold text-lg">+10</button>
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent  w-1/3  font-bold text-lg">+20</button>
                    </div>
                    <div className="flex flex-wrap -space-x-px font-bold text-lg  h-12">
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent w-1/3  font-bold text-lg">+50</button>
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent  w-1/3  font-bold text-lg">+100</button>
                      <button className="btn-lg bg-slate-800 hover:bg-slate-600 active:bg-slate-800 text-white rounded-none border-l-indigo-400 first:rounded-l last:rounded-r first:border-r-transparent  w-1/3  font-bold text-lg">ALL</button>
                    </div>
                  </div>
                </div>
                {/* 交易情绪 */}
                <div className='mt-6 h-1/6'>
                  <div className=''>
                    <div className="font-semibold text-center mb-6  text-white">利润 95%</div>
                    <div className="text-teal-500 text-5xl font-bold text-center mb-6">+$1000</div>
                  </div>
                  <div className="text-sm font-semibold mb-4 text-center  text-white">交易情绪</div>
                  <div className="pb-4 border-b border-gray-700">
                    <div className="relative w-full h-2 bg-teal-500 ">
                      <div className="absolute inset-0 bg-red-500 " aria-hidden="true" style={{ width: '60%' }} />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <div className='text-red-500'>40%</div>
                      <div className="text-teal-500">40%</div>
                    </div>
                  </div>
                </div>
                {/* 买/卖 */}
                <div className="mt-6 ">
                  <div className="text-sm font-semibold text-white mb-4 text-center">做个交易吧！</div>
                  <div className='flex flex-nowrap pb-4 border-b border-gray-700'>
                    <button className="btn-lg bg-teal-500 hover:bg-teal-600 text-white text-2xl w-1/3 h-16 flex text-center justify-center">
                      <div className='flex my-auto'>
                        买
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      
                    </button>
                    
                    <button className="btn-lg border-slate-200 bg-slate-100 text-slate-400 w-1/3 text-3xl" disabled>
                    15 s
                    </button>
                    
                    <button className="btn-lg bg-red-500 hover:bg-red-600 text-white  text-2xl w-1/3 flex text-center justify-center">
                      <div className='flex my-auto'>
                        卖
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
                {/* 订单记录 */}
                <div className="mt-6 text-sm font-semibold mb-4 text-center">订单记录</div>
                <div className='overflow-y-auto space-y-3 h-2/6'>
                    {/* Card 1 */}
                  <label className="relative block cursor-pointer text-left w-full">
                    <input type="radio" name="radio-buttons" className="peer sr-only" />
                    <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                      <div className="grid grid-cols-12 items-center gap-x-2">
                        {/* Card */}
                        <div className="col-span-6 order-1 flex items-center space-x-4">
                          <svg t="1657446824560" className="w-10 h-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1709" width="20" height="20"><path d="M1023.082985 511.821692c0 281.370746-228.08199 509.452736-509.452736 509.452736-281.360557 0-509.452736-228.08199-509.452737-509.452736 0-281.365652 228.092179-509.452736 509.452737-509.452737 281.370746 0 509.452736 228.087085 509.452736 509.452737" fill="#1BA27A" p-id="1710"></path><path d="M752.731701 259.265592h-482.400796v116.460896h182.969951v171.176119h116.460895v-171.176119h182.96995z" fill="#FFFFFF" p-id="1711"></path><path d="M512.636816 565.13592c-151.358408 0-274.070289-23.954468-274.070289-53.50782 0-29.548259 122.706786-53.507821 274.070289-53.507821 151.358408 0 274.065194 23.959562 274.065194 53.507821 0 29.553353-122.706786 53.507821-274.065194 53.50782m307.734925-44.587303c0-38.107065-137.776398-68.995184-307.734925-68.995184-169.953433 0-307.74002 30.888119-307.74002 68.995184 0 33.557652 106.837333 61.516418 248.409154 67.711363v245.729433h116.450707v-245.632637c142.66205-6.001353 250.615085-34.077294 250.615084-67.808159" fill="#FFFFFF" p-id="1712"></path></svg>
                          <div>
                            <div className="text-sm font-medium  text-white">1000</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-6 order-1 text-right">
                          <div className="text-sm text-teal-500">+20000</div>
                        </div>
                        {/* Name */}
                        <div className="col-span-6 order-2 text-left">
                          <div className="text-sm font-medium text-white-300 truncate">2022-12-23 09:10:11</div>
                        </div>

                        {/* Card status */}
                        <div className="col-span-6 order-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                          <div className="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">
                            胜利
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 border-2 border-transparent border-teal-500 rounded pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                  {/* Card 2 */}
                  <label className="relative block cursor-pointer text-left w-full">
                    <input type="radio" name="radio-buttons" className="peer sr-only" />
                    <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                      <div className="grid grid-cols-12 items-center gap-x-2">
                        {/* Card */}
                        <div className="col-span-6 order-1 flex items-center space-x-4">
                          <svg t="1657446824560" className="w-10 h-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1709" width="20" height="20"><path d="M1023.082985 511.821692c0 281.370746-228.08199 509.452736-509.452736 509.452736-281.360557 0-509.452736-228.08199-509.452737-509.452736 0-281.365652 228.092179-509.452736 509.452737-509.452737 281.370746 0 509.452736 228.087085 509.452736 509.452737" fill="#1BA27A" p-id="1710"></path><path d="M752.731701 259.265592h-482.400796v116.460896h182.969951v171.176119h116.460895v-171.176119h182.96995z" fill="#FFFFFF" p-id="1711"></path><path d="M512.636816 565.13592c-151.358408 0-274.070289-23.954468-274.070289-53.50782 0-29.548259 122.706786-53.507821 274.070289-53.507821 151.358408 0 274.065194 23.959562 274.065194 53.507821 0 29.553353-122.706786 53.507821-274.065194 53.50782m307.734925-44.587303c0-38.107065-137.776398-68.995184-307.734925-68.995184-169.953433 0-307.74002 30.888119-307.74002 68.995184 0 33.557652 106.837333 61.516418 248.409154 67.711363v245.729433h116.450707v-245.632637c142.66205-6.001353 250.615085-34.077294 250.615084-67.808159" fill="#FFFFFF" p-id="1712"></path></svg>
                          <div>
                            <div className="text-sm font-medium text-white">1000</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-6 order-1 text-right">
                          <div className="text-sm"></div>
                        </div>
                        {/* Name */}
                        <div className="col-span-6 order-2 text-left">
                          <div className="text-sm font-medium text-white-300 truncate">2022-12-23 09:10:11</div>
                        </div>

                        {/* Card status */}
                        <div className="col-span-6 order-2 text-right ">
                          <div className="text-xs inline-flex font-medium bg-red-100 text-red-600 rounded-full text-center px-2.5 py-1">
                            失败
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 border-2  border-red-500 rounded pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                  {/* Card 3 */}
                  <label className="relative block cursor-pointer text-left w-full">
                    <input type="radio" name="radio-buttons" className="peer sr-only" />
                    <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                      <div className="grid grid-cols-12 items-center gap-x-2">
                        {/* Card */}
                        <div className="col-span-6 order-1 flex items-center space-x-4">
                          <svg t="1657446824560" className="w-10 h-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1709" width="20" height="20"><path d="M1023.082985 511.821692c0 281.370746-228.08199 509.452736-509.452736 509.452736-281.360557 0-509.452736-228.08199-509.452737-509.452736 0-281.365652 228.092179-509.452736 509.452737-509.452737 281.370746 0 509.452736 228.087085 509.452736 509.452737" fill="#1BA27A" p-id="1710"></path><path d="M752.731701 259.265592h-482.400796v116.460896h182.969951v171.176119h116.460895v-171.176119h182.96995z" fill="#FFFFFF" p-id="1711"></path><path d="M512.636816 565.13592c-151.358408 0-274.070289-23.954468-274.070289-53.50782 0-29.548259 122.706786-53.507821 274.070289-53.507821 151.358408 0 274.065194 23.959562 274.065194 53.507821 0 29.553353-122.706786 53.507821-274.065194 53.50782m307.734925-44.587303c0-38.107065-137.776398-68.995184-307.734925-68.995184-169.953433 0-307.74002 30.888119-307.74002 68.995184 0 33.557652 106.837333 61.516418 248.409154 67.711363v245.729433h116.450707v-245.632637c142.66205-6.001353 250.615085-34.077294 250.615084-67.808159" fill="#FFFFFF" p-id="1712"></path></svg>
                          <div>
                            <div className="text-sm font-medium text-white">1000</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                          </div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-6 order-1 text-right">
                          <div className="text-sm"></div>
                        </div>
                        {/* Name */}
                        <div className="col-span-6 order-2 text-left">
                          <div className="text-sm font-medium text-white-300 truncate">2022-12-23 09:10:11</div>
                        </div>

                        {/* Card status */}
                        <div className="col-span-6 order-2 text-right ">
                          <div className="text-xs inline-flex font-medium bg-teal-100 text-teal-600 rounded-full text-center px-2.5 py-1">
                            胜利
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 border-2  border-teal-500 rounded pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                  {/* Card 4 */}
                  <label className="relative block cursor-pointer text-left w-full">
                    <input type="radio" name="radio-buttons" className="peer sr-only" />
                    <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                      <div className="grid grid-cols-12 items-center gap-x-2">
                        {/* Card */}
                        <div className="col-span-6 order-1 flex items-center space-x-4">
                          <svg t="1657446824560" className="w-10 h-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1709" width="20" height="20"><path d="M1023.082985 511.821692c0 281.370746-228.08199 509.452736-509.452736 509.452736-281.360557 0-509.452736-228.08199-509.452737-509.452736 0-281.365652 228.092179-509.452736 509.452737-509.452737 281.370746 0 509.452736 228.087085 509.452736 509.452737" fill="#1BA27A" p-id="1710"></path><path d="M752.731701 259.265592h-482.400796v116.460896h182.969951v171.176119h116.460895v-171.176119h182.96995z" fill="#FFFFFF" p-id="1711"></path><path d="M512.636816 565.13592c-151.358408 0-274.070289-23.954468-274.070289-53.50782 0-29.548259 122.706786-53.507821 274.070289-53.507821 151.358408 0 274.065194 23.959562 274.065194 53.507821 0 29.553353-122.706786 53.507821-274.065194 53.50782m307.734925-44.587303c0-38.107065-137.776398-68.995184-307.734925-68.995184-169.953433 0-307.74002 30.888119-307.74002 68.995184 0 33.557652 106.837333 61.516418 248.409154 67.711363v245.729433h116.450707v-245.632637c142.66205-6.001353 250.615085-34.077294 250.615084-67.808159" fill="#FFFFFF" p-id="1712"></path></svg>
                          <div>
                            <div className="text-sm font-medium text-white">1000</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                          </div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-6 order-1 text-right">
                          <div className="text-sm"></div>
                        </div>
                        {/* Name */}
                        <div className="col-span-6 order-2 text-left">
                          <div className="text-sm font-medium text-white-300 truncate">2022-12-23 09:10:11</div>
                        </div>

                        {/* Card status */}
                        <div className="col-span-6 order-2 text-right ">
                          <div className="text-xs inline-flex font-medium bg-red-100 text-red-600 rounded-full text-center px-2.5 py-1">
                            失败
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 border-2  border-red-500 rounded pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                  {/* Card 5 */}
                  <label className="relative block cursor-pointer text-left w-full">
                    <input type="radio" name="radio-buttons" className="peer sr-only" />
                    <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                      <div className="grid grid-cols-12 items-center gap-x-2">
                        {/* Card */}
                        <div className="col-span-6 order-1 flex items-center space-x-4">
                          <svg t="1657446824560" className="w-10 h-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1709" width="20" height="20"><path d="M1023.082985 511.821692c0 281.370746-228.08199 509.452736-509.452736 509.452736-281.360557 0-509.452736-228.08199-509.452737-509.452736 0-281.365652 228.092179-509.452736 509.452737-509.452737 281.370746 0 509.452736 228.087085 509.452736 509.452737" fill="#1BA27A" p-id="1710"></path><path d="M752.731701 259.265592h-482.400796v116.460896h182.969951v171.176119h116.460895v-171.176119h182.96995z" fill="#FFFFFF" p-id="1711"></path><path d="M512.636816 565.13592c-151.358408 0-274.070289-23.954468-274.070289-53.50782 0-29.548259 122.706786-53.507821 274.070289-53.507821 151.358408 0 274.065194 23.959562 274.065194 53.507821 0 29.553353-122.706786 53.507821-274.065194 53.50782m307.734925-44.587303c0-38.107065-137.776398-68.995184-307.734925-68.995184-169.953433 0-307.74002 30.888119-307.74002 68.995184 0 33.557652 106.837333 61.516418 248.409154 67.711363v245.729433h116.450707v-245.632637c142.66205-6.001353 250.615085-34.077294 250.615084-67.808159" fill="#FFFFFF" p-id="1712"></path></svg>
                          <div>
                            <div className="text-sm font-medium text-white">1000</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                          </div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-6 order-1 text-right">
                          <div className="text-sm"></div>
                        </div>
                        {/* Name */}
                        <div className="col-span-6 order-2 text-left">
                          <div className="text-sm font-medium text-white-300 truncate">2022-12-23 09:10:11</div>
                        </div>

                        {/* Card status */}
                        <div className="col-span-6 order-2 text-right ">
                          <div className="text-xs inline-flex font-medium bg-red-100 text-red-600 rounded-full text-center px-2.5 py-1">
                            失败
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 border-2 border-red-500 rounded pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                </div>
                  
              </div>
            </div>
          </div>
            

          </div>

        

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Trade;