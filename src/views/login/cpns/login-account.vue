<template>
  <div class="login-account">
    <!--
      <el-form
        label-width="60px"  // 左侧宽度
        :rules="rules"    // 绑定对应的 rules
        :model="account"  //  绑定判定 rules 的值
        label-position="left"   // 左侧文字
      >
     -->
    <el-form
      label-width="70px"
      :rules="rules"
      :model="account"
      label-position="left"
      ref="formRef"
    >
      <!-- <el-form-item label="账号"(左侧显示的文字) prop="name"(rules 中的值)> -->
      <el-form-item label="账号" prop="name">
        <!-- <el-input v-model="account.name"(双向绑定 account.name)></el-input> -->
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      // 获取提交表单的验证
      formRef.value?.validate((valid) => {
        // 当符合 rules 时 valid 为 true
        if (valid) {
          // 1.是否记住密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
            localCache.setCache('isKeepPassword', isKeepPassword)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
            localCache.setCache('isKeepPassword', false)
          }

          // 2.进行登录逻辑
          // 2.1 将用户名信息储存在 vuex
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          alert('用户名或密码错误')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped lang="less">
.login-account {
  margin-top: 20px;
}
</style>
