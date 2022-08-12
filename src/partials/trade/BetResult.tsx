import React,{ useState, useRef, useEffect }  from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';


function BetResult(props) {
  const [circleResult, setCircleResult] = useState([])
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if(props.initData){
      applyCircleResult(props.initData)
    }
  }, [props.initData]);

  useEffect(() => {
    if(props.lastData){
      updateCircleResult(props.lastData)
    }
  }, [props.lastData]);

  function updateCircleResult(jsonStr){
    
    let obj = JSON.parse(jsonStr)
      obj.timestamp = obj.id

      let haveMin = 0;
      
      let nowDate = moment(new Date(obj.id));
      let mm = nowDate.format('mm');
      let ss = nowDate.format('ss');
  
      if(mm.length > 1){
        haveMin = Number(mm.charAt(1));
      }else{
        haveMin = Number(mm);
      }
      if(Number(ss) >= 30){
        haveMin = Number(haveMin)+1;
      }else{
        haveMin = Number(haveMin)+0.5;
      }
      
      let fourCount = haveMin/0.5;

      
      if(fourCount > 1){
        setCircleResult(oldArray => {
          let newArray = [...oldArray]
          newArray[3][fourCount-1] = obj
          return newArray
        })
      }else{

        let newList = [obj];
        for (let index = 0; index < 19; index++) {
          newList.push({})
        }

        setCircleResult(oldArray => {
          let newArray = [...oldArray]
          newArray[0] = oldArray[1]
          newArray[1] = oldArray[2]
          newArray[2] = oldArray[3]
          newArray[3] = newList
          return newArray
        })
      }
  }

  function applyCircleResult(list){
    
    if(!list || list.length <= 0){
      return;
    }
    let lastKline = list[0];
    
    let haveMin = 0;
    //对时间段进行分组，1-10，10-20，20-30，current
    let nowDate = moment(new Date(lastKline.id));
    let mm = nowDate.format('mm');
    let ss = nowDate.format('ss');

    if(mm.length > 1){
      haveMin = Number(mm.charAt(1));
    }else{
      haveMin = Number(mm);
    }
    if(Number(ss) >= 30){
      haveMin = Number(haveMin)+1;
    }else{
      haveMin = Number(haveMin)+0.5;
    }
    let fourCount = haveMin/0.5;
    let fourList = [];
    let threeList = [];
    let twoList = [];
    let oneList = [];
    for (let index = 0; index < (20-fourCount); index++) {
      fourList.push({})
    }
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if(index < fourCount){
        fourList.push(element)
      }else if(index < fourCount+20){
        threeList.push(element)
      }else if(index < fourCount+40){
        twoList.push(element)
      }else if(index < fourCount+60){
        oneList.push(element)
      }
    }
    clear()

    add(oneList.reverse())
    add(twoList.reverse())
    add(threeList.reverse())
    add(fourList.reverse())
    // setValue([...value, item])

    
    // setCircleResult([oneList.reverse(),twoList.reverse(),threeList.reverse(),fourList.reverse()])
   
  }
  function clear() {
    setCircleResult(oldArray => [])
  } 
  function add(item) {
    setCircleResult(oldArray => [...oldArray, item])
  } 
  return (
    <>
      
      <div className=" w-full  py-2">
        {/* <header className=" border-b border-gray-700 lg:16 lg:my-5 lg:mx-5 ">
          <span className="font-semibold text-white">投注结果</span>
        </header> */}
        <div className='flex justify-between mx-2 mt-1'>
          {
              circleResult.map((item, index) => {
                if(index === 0){
                  return <div key={index} className='grid-rows-4 grid-flow-col hidden lg:grid  lg:w-50 lg:h-34'>
                    {
                      item.map((item2,index2) => {
                        if(item2.open){
                          if(item2.open < item2.close){
                            return <div key={index+''+index2} className='lg:w-6 lg:h-6 w-4 h-4 bg-teal-500 rounded-full m-auto'/>
                          }else if(item2.open > item2.close){
                            return <div key={index+''+index2} className='lg:w-6 lg:h-6 w-4 h-4 bg-red-500 rounded-full m-auto'/>
                          }else{
                            return <div key={index+''+index2} className='lg:w-6 lg:h-6 w-4 h-4 bg-slate-200 border border-slate-600 rounded-full m-auto'/>
                          }
                        }else{
                          return <div key={index+''+index2} className='lg:w-6 lg:h-6 w-4 h-4 border border-slate-600 rounded-full m-auto'/>
                        }
                      })
                    }
                </div>
                }else{
                  return <div key={index} className='grid-rows-4 grid-flow-col grid  lg:w-50 lg:h-34'>
                    {
                      item.map((item3,index3) => {
                        if(item3.open){
                          if(item3.open < item3.close){
                            return <div key={index+''+index3} className='lg:w-6 lg:h-6 w-4 h-4 bg-teal-500 rounded-full m-auto'/>
                          }else if(item3.open > item3.close){
                            return <div key={index+''+index3} className='lg:w-6 lg:h-6 w-4 h-4 bg-red-500 rounded-full m-auto'/>
                          }else{
                            return <div key={index+''+index3} className='lg:w-6 lg:h-6 w-4 h-4 bg-slate-200 border border-slate-600 rounded-full m-auto'/>
                          }
                        }else{
                          return <div key={index+''+index3} className='lg:w-6 lg:h-6 w-4 h-4 border border-slate-600 rounded-full m-auto'/>
                        }
                      })
                    }
                </div>
                }
              })
          }
        </div>
        
      </div>
    </>
  );
}

export default BetResult;