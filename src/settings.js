export default  {
  //PRO，DEV
   NODE_ENV: 'PRO',
   PRO:{
    VUE_APP_BASE_API: 'http://8.134.96.143:8000/',
    VUE_APP_SOCKET_API: 'ws://8.134.96.143:8000'
   },
   DEV:{
    VUE_APP_BASE_API: 'http://127.0.0.1:8000/',
    VUE_APP_SOCKET_API: 'ws://127.0.0.1:8000'
   },
   TokenKey: 'EL-APP-TOEKN',
}
