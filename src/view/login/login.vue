<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
        <div class="form-con">
          <p class="error">{{error}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import {getUserInfo} from "@/api/user";
import { mapActions } from "vuex";
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      error: ""
    }
  },
  methods: {
    ...mapActions(["handleLogin", " getUserInfo"]),
    handleSubmit({ username, password, captcha }){
      this.handleLogin({ username, password, captcha }).then(res => {
        if (res.code === 0) {
         getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
            })
          })
        } else {
          this.error = res.msg;
        }
      });
    }
  }
}
</script>

<style>
</style>
