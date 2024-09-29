import axios from "axios";
const http = axios.create({
  baseURL: "https://meituan.thexxdd.cn/apie",
  timeout: 5000,
})

// 请求拦截器
http.interceptors.request.use(config => {
  return config
})

// 响应拦截器
http.interceptors.response.use(res=>{
  return res.data.data
})

export default http