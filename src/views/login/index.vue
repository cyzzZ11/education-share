<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="Sugar,遇见另一个自己。">
          <van-icon slot="left" name="cross"  @click="$router.back()"/>
      </van-nav-bar>
    <div class="middiv">  <img src="./bg.jpg" alt=""> 
    </div>
    <div class="bgs"> <img src="../login/xingxng.png" alt=""></div>
      <!-- 登录栏 -->
      <van-form @submit="onSubmit" class="allziti" ref="loginForm">
          <van-field
         v-model="user.mobile"
            name="mobile"
            placeholder="请输入电话号码"
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11"
         >
            <i slot="left-icon" class="toutiao toutiao-xiangji"></i>
          </van-field>
          <van-field
          v-model="user.code"
            name="code" 
            placeholder="请输入验证码"
            :rules="userFormRules.rode"
            type="number"
            maxlength="6"
        >
          <i slot="left-icon" class="toutiao toutiao-youjian "></i>
            <template #button>
              <!-- 倒计时盒子下面 -->
              <van-count-down 
              v-if="isCountDownShow"
              :time="61*1000"  
              format="ss s"
              @finish="isCountDownShow=false"/>
               <van-button 
              v-else
              native-type="button"
               size="small" 
               class="send-sms-btn" 
               round 
               type="primary"
                @click="onSendSms">获取旅程票</van-button>
                
            </template>

</van-field>
<div style="margin: 16px;">
    <van-button block class="secai" native-type="submit">开启，精神旅途</van-button>
</div>
</van-form>
</div>
</template>

<script>
    import {
        login,
        SmsCode
    } from '@/api/user'
    export default {
        name: 'LoginPage',
        components: {},
        props: {},
        data() {
            return {
                user: {
                    mobile: '13911111111', //默认手机号
                    code: '', //默认验证码'246810'
                },
                userFormRules: {
                    mobile: [{
                        required: true,
                        message: '手机号不能为空'
                    }, {
                        pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
                        message: '手机号格式错误'
                    }],
                    rode: [{
                        required: true,
                        message: '验证码不能为空'
                    }, {
                        pattern: /\d{6}/,
                        message: '验证码格式错误'
                    }]
                },
                // 是否展示倒计时
                isCountDownShow: false
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        methods: {
            async onSubmit() {

                // 获取 表单数据
                const user = this.user
                    // 表单验证在组件中使用必须改为￥this.toast来调用Toast组件
                this.$toast.loading({
                    message: '启程中...',
                    forbidClick: true, //禁用背景点击  
                    duration: 0, //持续加载时间  如果为0则持续展示

                    loadingType: 'spinner',

                })

                // 提交表单请求登录
                try {
                    const {
                        data
                    } = await login(user)
                        // console.log(res);输出一下可以看到data里面包括token所以那边函数里传入data参数就相当于传入了data包括token的所有数据
                    this.$store.commit('setUser', data.data)
                    this.$toast.success('旅途开始')
                    this.$router.push("/my");
                } catch (err) {
                    if (err.response.status === 400) {
                        this.$toast.fail('手机号或旅程票错误')
                    } else {
                        this.$toast.fail('启程失败了，请再试试')
                    }
                }

                // 根据请求相应结果处理后续操作


            },
            // 发送验证码事件函数
            async onSendSms() {
                // 校验手机号
                try {
                    await this.$refs.loginForm.validate('mobile')
                } catch (err) {
                    return console.log('验证失败', err)

                }
                // 倒计时
                // 验证通过显示倒计时
                this.isCountDownShow = true
                    // 请求发送验证码
                try {
                    await SmsCode(this.user.mobile)
                    this.$toast('获取旅程票成功')
                        // 登陆成功 跳转回原来页面
                        // back的方法不严谨 后面优化时候跟着走
                        // window.sessionStorage.setItem("token", res.data.token);

                } catch (err) {
                    // 发送失败，关闭倒计时
                    this.isCountDownShow = false
                    if (err.response.status === 429) {
                        this.$toast('发送太频繁了，请稍后重试')
                    } else {
                        this.$toast('发送失败，请稍后重试')
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .login-container {
        .toutiao {
            font-weight: 1000;
        }
        .send-sms-btn {
            border: none;
            background: #ededed;
            width: 152px;
            height: 46px;
            line-height: 46px;
            font-size: 22px;
            color: #666;
            font-weight: 600;
        }
    }
    
    .page-nav-bar {
        background-color: black;
    }
    
    .login-container {
        width: 100%;
        background-color: black;
    }
    
    .middiv {
        position: absolute;
        height: 600px;
        background-color: black;
        img {
            position: relative;
            top: 0px;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    
    .bgs {
        position: absolute;
        img {
            position: relative;
            top: 8rem;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    
    .secai {
        border: none;
        border-radius: 20px;
        background-color: #141608;
        font-weight: 600;
        color: #c5c4c4;
    }
    
    .van-form {
        background-color: pink;
    }
    
    .van-cell:first-child {
        background: linear-gradient(#f5d2d2, #f5b7b7, #f79f9e, )
    }
    
    .van-cell:nth-child(2) {
        border-bottom: none;
        background: linear-gradient( #f79f9e, #ce8d8f, #cb808c)
    }
    
    .allziti {
        color: black !important;
    }
    
    body {
        background-color: black;
    }
    
    .van-icon {
        color: #c5c4c4;
    }
</style>