<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'

const props = withDefaults(
  defineProps<{
    xLabels: string[]
    values: any[]
    title?: string
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {
    title: props.title,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    // 数据外边距
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      // 是否算上坐标数据
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '类别销量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
