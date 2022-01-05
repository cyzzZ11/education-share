// 文章请求模块
import request from '@/utils/request'

// 请求获取全部频道数据表数据
/** * 获取所有频道 */
export const getAllChannels = () => { 
    return request({  
        method: 'GET',
          url: '/app/v1_0/channels'
    })
}


//添加用户频道  下面第一个参数啊channel是设置的一个传过去的参数  给他在要求的接口文档里的参数
// 名称cha
export const addUserChannels = (channel) => { 
    return request({  
        method: 'PATCH',
          url: '/app/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}


// 删除用户频道持久化
export const removeUserChannels = (channelID) => { 
    return request({  
        method: 'DELETE',
          url: `/app/v1_0/user/channels/${channelID}`,
    })
}