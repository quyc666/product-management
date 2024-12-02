import { ElNotification, ElMessageBox } from 'element-plus'

//消息提示
export function toast(msg, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message: msg,
        type: type,
        dangerouslyUseHTMLString,
        duration: 2000
    })
}

//消息确认
export function showModal(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type
        }
    )
}

