import React,{ useState, useRef, useEffect }from 'react';
import { Link } from 'react-router-dom';
import keenLogo from '../../images/token/keen.jpg';
import usdtLogo from '../../images/token/usdt.png';
import KlineView from './KlineView';
import Transaction from '../transaction/Transaction'
import Dropdown from '../../utils/Dropdown';
import ModalBasic from '../../utils/ModalBasic';
import BetView from './BetView'
import BetResult from './BetResult';
import Config from '../../settings'
import { useWeb3React } from "@web3-react/core";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import generatedKLineDataList from '../../utils/generatedKLineDataList'
import NumberFormat  from 'react-number-format';

type KlineHeadData =   {
  lastPrice: number,
  timestamp: number,
  buyVolume: number,
  sellVolume: number,
  sellVolume24: number,
  buyVolume24:number,
  longTims24:number,
  shortTimes24:number,
}
const defaultValues:KlineHeadData = {
  lastPrice: 0,
  timestamp: 0,
  sellVolume: 0,
  buyVolume:0,
  sellVolume24: 0,
  buyVolume24:0,
  longTims24:0,
  shortTimes24:0,
};

function TradeInfo() {
  const [tabIndex,setTabIndex] = useState(0);
  const [betModalOpen, setBetModalOpen] = useState(false);
  const websocket = useRef()
  const [webSocketUrl,setWebSocketUrl] = useState(Config[Config.NODE_ENV].VUE_APP_SOCKET_API+'/webSocket/tourists');

  const [circleInitData, setCircleInitData] = useState([])
  const [circleLastData, setCircleLastData] = useState()

  const [klineInitData, setKlineInitData] = useState([])
  const [klineLastData, setKlineLastData] = useState()

  const [klineHeadData, setKlineHeadData] = useState(defaultValues)
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();
  const webSocket = useWebSocket(webSocketUrl,{},true);

  useEffect(() =>{
    if(webSocket.readyState == ReadyState.OPEN){
      webSocket.sendMessage('kline')
    }
  },[webSocket.readyState])
  useEffect(() =>{
    if(!webSocket.lastJsonMessage){
      return;
    }

    const data = webSocket.lastJsonMessage
    
    if (data.msgType === 'KLINE') {
      let obj = JSON.parse(data.msg)
      obj.timestamp = obj.id
      console.log(obj)
      setKlineLastData(obj)
      setKlineHeadData({...klineHeadData,lastPrice:obj.close,timestamp:obj.timestamp})
    } else if(data.msgType === 'KLINE_RESULT'){
      setCircleLastData(data.msg);
    }
  },[webSocket.lastJsonMessage])

  useEffect(() =>{
    setWebSocketUrl(Config[Config.NODE_ENV].VUE_APP_SOCKET_API+'/webSocket/13246')
    generatedKLineDataList().then(data => {
      let list = data.content;
      for (let index = 0; index < list.length; index++) {
        list[index].timestamp = list[index].id
      }
      let datas = list.reverse()
      setKlineInitData(datas)
      setCircleInitData(datas)
    })
    return ()=>{
      webSocket.getWebSocket().close()
    }
  },[])

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-16 md:pt-32 pb-3">
          
          <div className="max-w-full mx-auto md:max-w-none gap-3 flex-warp md:flex">
            {/*  Kline view */}
            <div className="flex flex-col w-full md:w-2/3 gap-3 rounded-2xl" >
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
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2 '>
                    <div className=' text-gray-500'>BTC最新价</div>
                    <div className='text-2xl text-teal-400'>
                      <NumberFormat value={klineHeadData.lastPrice} decimalScale={0} displayType="text" thousandSeparator={true}/>
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap ml-6 md:m-0 text-xs '>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2 '>
                    <div className=' text-gray-500'>当前买量</div>
                    <NumberFormat value={klineHeadData.buyVolume} decimalScale={4} displayType="text" thousandSeparator={true}/>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className='text-gray-500'>当前卖量</div>
                    <NumberFormat value={klineHeadData.sellVolume} decimalScale={4} displayType="text" thousandSeparator={true}/>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h涨(次)</div>
                    <NumberFormat value={klineHeadData.longTims24} decimalScale={0} displayType="text" thousandSeparator={true}/>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h跌(次)</div>
                    <NumberFormat value={klineHeadData.shortTimes24} decimalScale={0} displayType="text" thousandSeparator={true}/>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h买量</div>
                    <NumberFormat value={klineHeadData.buyVolume24} decimalScale={4} displayType="text" thousandSeparator={true}/>
                  </div>
                  <div className='flex flex-col items-start space-y-1 mr-4 mt-2'>
                    <div className=' text-gray-500'>24h卖量</div>
                    <NumberFormat value={klineHeadData.sellVolume24} decimalScale={4} displayType="text" thousandSeparator={true}/>
                  </div>
                </div>


              </div>
              <div className='h-96 md:h-full bg-gray-800 rounded-2xl shadow shadow-gray-600' >
                <KlineView initData={klineInitData} lastData={klineLastData}/>
              </div>
            </div>
            {/*  bet view desktop */}
            <div className='hidden md:flex flex-col w-full md:w-1/3'>
              <BetView/>
            </div>
          </div>
          <div  className="max-w-full mx-auto md:max-w-none  md:space-x-3 flex-warp md:flex  shadow shadow-gray-600 bg-gray-800 rounded-2xl mt-3" >
            <BetResult initData={circleInitData} lastData={circleLastData}/>
          </div>
          <div  className="max-w-full mx-auto md:max-w-none  md:space-x-3 flex-warp md:flex" >
            
            <Transaction />
          </div>
          
        </div>
        <ModalBasic id="betViewModal" modalOpen={betModalOpen} setModalOpen={setBetModalOpen} title={'交易面板'}>
          <BetView/>
        </ModalBasic>
        {/*  bet view mobile */}
        <div className='md:hidden fixed inset-x-0 bottom-0 w-full bg-gray-800 rounded-t-2xl shadow-2xl shadow-white p-4 z-10'>
          <div className='flex flex-nowrap space-x-4 text-white '>
          
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setBetModalOpen(true); }}  className="btn  bg-teal-500 w-full rounded-full ">
              买
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </button>
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setBetModalOpen(true); }}  className="btn  bg-red-500  w-full rounded-full">
              卖
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

export default TradeInfo;