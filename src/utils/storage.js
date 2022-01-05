// 封装本地存储操作模块
// 存储数据 
export const setItem = (key, value) => {
    if (typeof value === 'object') {
        // 将数组或者对象类型的数据转换为json格式字符串进行存储
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}

export const removeItem = key => {
    window.localStorage.removeItem(key)
}