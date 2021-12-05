<template>
  <div class="nav-header">
    <div class="fold" @click="changeFold">
      <el-icon v-if="collapse" size="30"><expand /></el-icon>
      <el-icon v-else size="30"><fold /></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['changeFold'],
  setup(props, { emit }) {
    const changeFold = () => {
      emit('changeFold')
    }
    return {
      changeFold
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold {
    cursor: pointer;
  }
}
</style>
