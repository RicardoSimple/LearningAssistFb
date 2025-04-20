<template>
  <div>
    <el-row>
      <el-col
        :span="20"
        :offset="2"
      > <el-descriptions
          title="我的资料"
          :border=true
        >
          <el-descriptions-item label="头像">
            <el-avatar
              :size="50"
              :src="user.avatar"
            ></el-avatar>
          </el-descriptions-item>
          <el-descriptions-item label="背景图片"><el-image
              style="height: 100px"
              :src="user.background"
            ></el-image></el-descriptions-item>
          <el-descriptions-item
            label="用户名">{{ user.userName }}</el-descriptions-item>
          <el-descriptions-item
            label="手机号">{{user.phone}}</el-descriptions-item>
          <el-descriptions-item label="昵称">
            <el-input
              v-model="user.nickName"
              :disabled="isEditing"
            ></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="邮箱">{{user.email}}</el-descriptions-item>
          <el-descriptions-item label="个人介绍">
            <el-input
              type="textarea"
              v-model="user.slogan"
              :disabled="isEditing"
            ></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="真实姓名"> <el-input
              v-model="user.name"
              :disabled="isEditing"
            ></el-input></el-descriptions-item>
          <el-descriptions-item label="性别"> <el-select
              v-model="user.gender"
              :disabled="isEditing"
              placeholder="您的性别"
            >
              <el-option
                label="男"
                value="male"
              ></el-option>
              <el-option
                label="女"
                value="female"
              ></el-option>
              <el-option
                label="保密"
                value="other"
              ></el-option>
            </el-select></el-descriptions-item>
          <el-descriptions-item label="操作">
            <el-button
              @click="toggleEditing"
              type="primary"
            >
              {{ isEditing ? '编辑' : '保存' }}
            </el-button>
            <el-button
              :disabled="isEditing"
              @click="recoverEvent"
            >取消</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { Message } from 'element-ui'
import { updateProfile } from '../../api/settingApi/settingApi'
import { refreshUserInfo } from '../../utils/userInfo'

export default {
  data () {
    return {
      isEditing: true,
      userForm: {
      },
      originData: null
    }
  },
  name: 'user-profile',
  props: ['user'],
  methods: {
    toggleEditing () {
      // 切换编辑状态
      if (!this.isEditing) {
        console.log(this.user)
        updateProfile(this.user).then(res => {
          Message.info(res.data)
          refreshUserInfo()
        })
      }
      this.isEditing = !this.isEditing;
    },
    recoverEvent () {
      this.user = JSON.parse(JSON.stringify(this.originData));
      this.isEditing = true
    }
  },
  created () {
    this.originData = JSON.parse(JSON.stringify(this.user));
  }
}
</script>