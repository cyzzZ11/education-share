// 文章请求模块
import request from '@/utils/request'

export const getComments = params => { 
    return request({  
        method: 'GET',
          url: '/app/v1_0/comments',
        params
    })
}

// 评论点赞功能
export const addCommentLike = target => { 
    return request({  
        method: 'POST',
          url: '/app/v1_0/comment/likings',
        data: {
            target
        }
    })
}



// 评论取消点赞功能
export const deleteCommentLike = target => { 
    return request({  
        method: 'DELETE',
          url: `/app/v1_0/comment/likings/${target}`
    })
}

// 发布文章评论或者评论回复  直接传一个对象data把接口文档里的请求体传过来

export const addComment = data => { 
    return request({  
        method: 'POST',
          url: `/app/v1_0/comments`,
        data
    })
}