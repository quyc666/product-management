import axios from "../axios";

// 首页统计数据
export function getstatistics1(){
    return axios.get('/admin/statistics1')
}