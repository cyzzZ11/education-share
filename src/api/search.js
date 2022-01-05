// 文章请求模块
import request from '@/utils/request'

// 请求获取全部频道数据表数据
/** * 获取所有频道 */
export const getSearchSuggestion = (q) => { 
    return request({  
        method: 'GET',
          url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}

// 获取搜索结果
export const getSearchResult = (params) => { 
    return request({  
        method: 'GET',
          url: '/app/v1_0/search',
        params
    })
}