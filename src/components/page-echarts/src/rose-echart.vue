<template>
  <div class="rose-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IData } from '../types'

const props = withDefaults(
  defineProps<{
    roseData: IData[]
  }>(),
  {}
)

const options = computed(() => {
  return {
    // legend: {
    //   top: 'bottom'
    // },
    // 工具栏
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        // 半径
        radius: [10, 150],
        center: ['50%', '50%'],
        // 玫瑰型
        roseType: 'area',
        // 每个扇形的样式
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
