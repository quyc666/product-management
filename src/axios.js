import axios from "axios";

const service = axios.create({
    baseURL:"http://ceshi13.dishait.cn",
    timeout: "3000"
})

export default service;