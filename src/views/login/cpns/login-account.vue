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

import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      // 获取提交表单的验证
      formRef.value?.validate((valid) => {
        // 当符合 rules 时 valid 为 true
        if (valid) {
          console.log('登录成功')
        } else {
          alert('账号或密码错误')
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
