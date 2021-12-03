<template>
  <div class="login-phone">
    <el-form
      label-width="70px"
      label-position="left"
      :rules="rules"
      :model="phone"
    >
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="get-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.login-phone {
  margin-top: 20px;

  .verify-code {
    display: flex;

    .get-code {
      margin-left: 10px;
    }
  }
}
</style>
