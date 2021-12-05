<template>
  <div class="login-phone">
    <el-form
      label-width="70px"
      label-position="left"
      :rules="rules"
      :model="phone"
      ref="formRef"
    >
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="get-code" @click="getCode"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'

import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      num: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const code = ref('')

    const getCode = () => {
      code.value = Math.random().toFixed(6).slice(-6)
      console.log(code.value)
    }

    const loginPhone = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (phone.code === code.value) {
            store.dispatch('login/phoneLoginAction', { ...phone })
          } else {
            alert('验证码错误')
          }
        } else {
          alert('手机号格式错误')
        }
      })
    }

    return {
      phone,
      rules,
      formRef,
      getCode,
      loginPhone
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
