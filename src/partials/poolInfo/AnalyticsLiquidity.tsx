import React,{ useState, useRef, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Config from '../../settings'
import generatedKLineDataList from '../../utils/generatedKLineDataList'
import { init, dispose } from 'klinecharts'

import { useWeb3React } from "@web3-react/core";

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
        show:false,
        color: gridColor
      },
      vertical: {
        show:false,
        color: gridColor
      }
    },
    candle: {
      priceMark: {
        show:false,
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
        showRule: 'none',
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
      type:'area',
      // 面积图
      area: {
        lineSize: 2,
        lineColor: '#2196F3',
        value: 'close',
        backgroundColor: [{
          offset: 0,
          color: 'rgba(33, 150, 243, 0.01)'
        }, {
          offset: 1,
          color: 'rgba(33, 150, 243, 0.2)'
        }]
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
        show:false,
        color: axisLineColor
      },
      tickLine: {
        show:false,
        color: axisLineColor
      },
      tickText: {
        color: textColor,
        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }
    },
    yAxis: {
      width: 120,
      axisLine: {
        show:false,
        color: axisLineColor,
        // length: 5,
      },
      tickLine: {
        show:false,
        color: axisLineColor,
      },
      
      tickText: {
        color: textColor,
        size: 14,
        // weight: 'bold',
        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        paddingLeft:30,
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

function AnalyticsLiquidity() {
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
  useEffect(() => {
    chart.current.setStyleOptions(getThemeOptions(theme))
  }, [theme])
  return (
    <div className="flex flex-col col-span-full xl:col-span-8 h-full w-full">
      <div  id="custom-style-k-line" className="k-line-chart  bg-no-repeat bg-cover h-full bg-cover bg-center " >
      </div>
    </div>
  );
}

export default AnalyticsLiquidity;
