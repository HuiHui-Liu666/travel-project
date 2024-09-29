import axios from "axios";
import emitter from '@/api/event.js'
const http = axios.create({
  baseURL: "https://meituan.thexxdd.cn/apie",
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data.data;
  },
  (err) => {
    if (err.response) {
      let status = err.response.status;
      switch (status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("未授权");
          emitter.emit('login-pop-up')
          break;
        case 403:
          console.log("禁止访问");
          break;
      }
    }
  }
);

export default {
  get(url, params) {
    return http.get(url, { params });
  },
  past(url, data) {
    return http.post(url, data);
  },
};
