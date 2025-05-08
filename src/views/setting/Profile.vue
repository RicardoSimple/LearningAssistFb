<template>
  <div>
    <el-card>
      <UserProfile
        v-if="currentUser!=null"
        :user="currentUser"
      ></UserProfile>
    </el-card>
  </div>
</template>

<script>
import UserProfile from '../../components/user/profile.vue'
import { currentUser } from '../../api/userApi'

export default {
  data () {
    return {
      currentUser: null
    }
  },
  async created () {
    await currentUser().then(res => {
      this.currentUser = res.data.user
      console.log(this.currentUser)
    })
  },
  components: {
    UserProfile
  }
}
</script>