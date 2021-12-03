<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" class="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span class="table">
            <el-icon><user-filled /></el-icon>账号登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="table">
            <el-icon><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox
        class="keep-password"
        v-model="isKeepPassword"
        label="记住密码"
      ></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(false)
    /*
      typeof LoginAccount: 获取组件对象的类型
      InstanceType<typeof LoginAccount>: 获取组件对象类型的实例类型
    */
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const handleLoginClick = () => {
      accountRef.value?.loginAction()
    }

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 180px;

  .title {
    text-align: center;
  }

  .table {
    display: flex;
    justify-content: center;
    align-items: center;

    .el-icon {
      padding-right: 5px;
    }
  }

  .account-control {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;

    .keep-password {
      height: 20px;
    }
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
