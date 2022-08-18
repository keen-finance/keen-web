import React,{ useState, useRef, useEffect } from 'react';

import AppHeader from '../partials/AppHeader';
import PageIllustration from '../partials/PageIllustration';
import BetResult from '../partials/trade/BetResult';

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


  



  const chart = useRef()




  const [height, setHeight] = useState(0); 




  // 订单
  const [orderTabIndex, setOrderTabIndex] = useState(0)
 





  return (
    <div className="flex flex-col  min-h-screen overflow-hidden ">

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
      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Trade;