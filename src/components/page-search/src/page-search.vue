<template>
  <div class="page-search">
    <zero-form v-bind="searchFormConfig" v-model="formDate">
      <template #header>
        <div class="header">
          <h2>高级检索</h2>
        </div>
      </template>
      <template #footer>
        <div class="footer">
          <el-button @click="handleResetClick">
            <el-icon><refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><search /></el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </zero-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import ZeroForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    ZeroForm
  },
  emits: ['handleResetClick', 'handleQueryClick'],
  setup(props, { emit }) {
    // 动态添加 formDate 的数据,有配置文件的 filed 决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.filed] = ''
    }

    // 重置按钮
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formDate.value[key] = formOriginData[key]
      }
      emit('handleResetClick')
    }

    // 搜索按钮
    const handleQueryClick = () => {
      emit('handleQueryClick', formDate.value)
    }

    const formDate = ref(formOriginData)
    return {
      formDate,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.footer {
  text-align: right;
  padding: 0 20px 30px 0;
}
</style>
