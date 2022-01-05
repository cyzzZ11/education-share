<template lang="">
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar
        title="个人信息"
        class="page-nav-bar"
        left-arrow
        @click-left="$router.back()"
        />
        <!-- 导航栏 -->

  <input type="file"
         hidden 
         ref="file"
         @change="onFileChange"
>

        <!-- 个人信息 -->
        <van-cell
        title="头像"
        is-link
        center
        @click="$refs.file.click()"
        >
        <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
        <van-cell
        title="昵称"
        :value="user.name"
        @click="isUpdateNameShow = true"
        is-link
        />
        <van-cell
        title="性别"
        :value="user.gender === 0 ? '帅哥' : '美女'"
        @click="isUpdateGenderShow = true"
        is-link
        />
        <van-cell
        title="生日"
        :value="user.birthday"
        @click="isUpdateBthShow = true"
        is-link
        />
        <!-- 个人信息 -->

        <!-- 编辑昵称 -->
        <van-popup 
        v-model="isUpdateNameShow"
        style="height: 100%;"
        position=bottom
        >
<update-name
v-if="isUpdateNameShow"
@close="isUpdateNameShow = false"
v-model="user.name"
/>
        </van-popup>
        <!-- 编辑昵称 -->
        <!-- 编辑性别 -->
        <van-popup 
        v-model="isUpdateGenderShow"
        position=bottom
        >
        <update-gender 
        v-model="user.gender"
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        />
        </van-popup>
        <!-- 编辑性别 -->

           <!-- 编辑生日 -->
           <van-popup 
           v-model="isUpdateBthShow"
           position=bottom
           >
           <update-bth 
           v-model="user.birthday"
           v-if="isUpdateBthShow"
           @close="isUpdateBthShow = false"
           />
           </van-popup>
           <!-- 编辑生日 -->

           <!-- 编辑头像 -->
           <van-popup 
           v-model="isUpdatePhotoShow"
           position=bottom
           style="height: 100%;"
           >
          <update-photo
          v-if="isUpdatePhotoShow"
       :img="img"
       @close="isUpdatePhotoShow = false"
       @update-photo="user.photo = $event"
          />
           </van-popup>

           <!-- 编辑头像  $event是接受子组件传来的控制台回来的data.data.photo -->
    </div>
</template>
<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "../user-profile/components/update-name.vue";
import UpdateGender from "../user-profile/components/update-gender.vue";
import UpdateBth from "../user-profile/components/update-bth.vue";
import UpdatePhoto from "../user-profile/components/update-photo.vue";
export default {
  name: "UserProfile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBth,
    UpdatePhoto,
  },
  props: {},
  data() {
    return {
      user: {}, //个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBthShow: false,
      isUpdatePhotoShow: false,
      img: null, //预览的图片默认是null
    };
  },
  created() {
    this.loadUserprofile();
  },
  methods: {
    async loadUserprofile() {
      try {
        const { data } = await getUserProfile();
        console.log(data);
        this.user = data.data;
      } catch (error) {
        this.$toast("数据加载失败，请稍后重试");
      }
    },

    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      // 基于文件对象获取blob数据
      // const data = window.URL.createObjectURL(file)
      this.img = window.URL.createObjectURL(file);
      // console.log(data)
      // this.img = data
      this.isUpdatePhotoShow = true;
      // file-input选择同一张图片时候不会触发change事件 解决banf
      // 解决办法每次完成后清空value
      this.$refs.file.value = "";
    },
  },
};
</script>
<style lang="less" scoped>
.van-popup {
  background-color: rgb(253, 198, 207);
}
</style>