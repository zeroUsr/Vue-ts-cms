<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'

import { useEchart } from '../hooks/use-echart'

// 可为 props 定义默认值
const props = withDefaults(
  defineProps<{
    // 定义props
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  // 定义默认值
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOption } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<style lang="less" scoped></style>
