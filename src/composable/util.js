import { ElNotification } from 'element-plus'

//消息提示
export function toast(msg, type="success", dangerouslyUseHTMLString=false){
    ElNotification({
        message: msg,
        type: type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}
