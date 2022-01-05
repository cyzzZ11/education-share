// 用户相关请求模块
import request from '../utils/request'
// 把容器模块加载进来
// import store from '@/store'  没有用就注释掉 因为用了拦截器
export const login = data => {
        return request({
            method: 'POST',
            url: '/app/v1_0/authorizations',
            data: data
        })
    }
    // 请求验证码相关模块 注意接口每分钟发送一次
export const SmsCode = mobile => {
        return request({
            method: 'GET',
            url: `/app/v1_0/sms/codes/${mobile}`
        })
    }
    // 获取用户自己的信息 没有传的参数然后按需加载到相关页面
export const getUserInfo = () => {
    return request({
        method: 'GET',

        url: `/app/v1_0/user`,
        // // 专门用来发送请求头数据不能乱写看接口文档 token的数据格式 Bearer token数据  注意Bearer后面有个空格
        // headers: {
        //     // 注意该接口需要授权才能访问
        //     Authorization: `Bearer ${store.state.user.token}`
        // 用了拦截器就把这里注释掉
        // }
    })
}
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels`
    })
}


// 关注用户
export const addUsers = target => {
        return request({
            method: 'POST',
            url: `/app/v1_0/user/followings`,
            data: {
                target
            }
        })
    }
    // 取消关注用户

export const removeUsers = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`
    })
}

// 获取当前登录用户的个人资料
export const getUserProfile = target => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/profile`
    })
}

// 更新用户的个人资料
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: `/app/v1_0/user/profile`,
        data
    })
}


// 编辑用户的照片资料  看请求的参数名称  直接写data 需要谁写谁
export const updateUserImg = data => {
    return request({
        method: 'PATCH',
        url: `/app/v1_0/user/photo`,
        data
    })
}