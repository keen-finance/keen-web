import React,{ useState, useRef, useEffect } from 'react';

import Config from '../../settings'
import generatedKLineDataList from '../../utils/generatedKLineDataList'
import { init, dispose } from 'klinecharts'
import { useWeb3React } from "@web3-react/core";
import useWindowSize from '../../utils/useWindowSize'

const textColorDark = '#ffff'
const gridColorDark = '#3a3a3acc'
const axisLineColorDark = '#3a3a3acc'
const crossTextBackgroundColorDark = '#373a40'

const textColorLight = '#ededed'
const gridColorLight = '#ededed'
const axisLineColorLight = '#3a3a3acc'
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
        show:true,
        color: gridColor
      },
      backgroundColor: 'red'
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
            family: 'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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
          // offsetLeft: 1,
          // offsetTop: 10,
          // offsetRight: 0,
          borderRadius: 4,
          borderSize: 1,
          borderColor: '#3f4254',
          backgroundColor: 'rgba(17, 17, 17, .3)'
        },
        text: {
          size: 12,
          family: 'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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
        color: textColor,
        size: 11,
        // family: 'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
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
        size: 11,
        // weight: 'bold',
        // family: 'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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

function KlineView({
  initData,
  lastData
}) {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();


  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { width, height } = useWindowSize()

  const chart = useRef()
  const paneId = useRef()



  const [theme, setTheme] = useState('dark')



  useEffect(() => {
    let current = init('custom-style-k-line')
    chart.current = current
    
    let height = 360
    if(width >= 760){
      height = 555
    }
    if(!initData){
      return
    }
    paneId.current = current.createTechnicalIndicator('VOL', true,{ dragEnabled:true})
    current.setZoomEnabled(false)
    current.setScrollEnabled(false)
    current.setDataSpace(15)
    current.setOffsetRightSpace(0);
    current.setStyleOptions(getThemeOptions(theme))
    
    
    current.applyNewData(initData)
    
    return () => {
      dispose('custom-style-k-line')
    }
  },[width,initData])


  useEffect(() =>{
    if(!lastData){
      return;
    }
    if(!chart.current){
      return;
    }
    if(!chart.current.getDataList()){
      return;
    }
    
    chart.current.updateData(lastData)
    console.log("update to kline")
  },[lastData,chart.current])

  const resizeUpdate = (e) => {
    // 通过事件对象获取浏览器窗口的高度
    let h = e.target.innerHeight;
    
    chart.current.resize();
}

useEffect(() => {
  // 页面刚加载完成后获取浏览器窗口的大小
  let h = window.innerHeight;
  

  // 页面变化时获取浏览器窗口的大小 
  window.addEventListener('resize', resizeUpdate);

  return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate);
  }
}, []);


  return (
    <div className="flex flex-col col-span-full xl:col-span-8 h-full w-full">
      <div  id="custom-style-k-line" className="k-line-chart h-full" >
      </div>
    </div>
  );
}

export default KlineView;
