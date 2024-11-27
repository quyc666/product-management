import axios from "axios";
import { useRouter } from 'vue-router'
import { getCookie } from "./composable/auth";
import { toast } from "./composable/util";



const service = axios.create({
    baseURL: "/api",
    timeout: "3000"
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    const router = useRouter();
    const token =  getCookie()
    if (token) {
        config.headers["token"] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data;
}, function (error) {
    // 对响应错误做点什么
    toast(error.response.data.msg || "请求失败", "error")
    return Promise.reject(error.response.data);
});

export default service;