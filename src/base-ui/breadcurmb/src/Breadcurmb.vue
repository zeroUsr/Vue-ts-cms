<template>
  <div class="zero-breadcurmb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcurmbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path ?? null }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IBreadcurmb } from '../types'

export default defineComponent({
  props: {
    breadcurmbs: {
      type: Array as PropType<IBreadcurmb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
