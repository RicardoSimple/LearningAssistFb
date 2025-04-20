<template>
  <div class="profile-container">
    <el-row>
      <el-col
        :span="4"
        :offset="1"
      >
        <el-card>
          <el-row>
            <el-col
              :span="16"
              :offset="4"
            >
              <el-divider></el-divider>
            </el-col>
          </el-row>

          <el-row>
            <el-col
              :span="12"
              :offset="9"
            >
              <router-link
                class="settingBtn"
                to="/setting/profile"
              >个人资料</router-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="16"
              :offset="4"
            >
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="12"
              :offset="9"
            >
              <router-link
                class="settingBtn"
                to="/setting/history"
              >历史记录</router-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="16"
              :offset="4"
            >
              <el-divider></el-divider>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col
        :span="17"
        :offset="1"
      >
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
}
</script>

<style>
.profile-container {
  margin-top: 20vh;
}
.settingBtn {
  font-size: 16px;
}
.el-divider--horizontal {
  margin: 12px 0;
  display: block;
  height: 1px;
  width: 100%;
}
</style>