<template>
  <div class="zero-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="item">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'default title'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 30px;
}

.item {
  margin-bottom: 10px;
}
</style>
