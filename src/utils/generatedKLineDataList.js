
import list from '../api/kline/kline'

export default async function (startTime, endTime,page=0,size=100,sort='id,desc') {
  let dataList = []
  dataList = await list.list({
    page,
    size,
    sort,
    greaterThanId:startTime,
    lessThanId:endTime
  })
  return dataList
}
