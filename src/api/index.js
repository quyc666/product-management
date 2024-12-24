import axios from "../axios";

// 首页统计数据
export function getstatistics1(){
    return axios.get('/admin/statistics1')
}

export function getstatistics3(type){
    return axios.get('/admin/statistics3?type='+type)
}