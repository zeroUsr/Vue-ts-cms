<template>
  <div class="map-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IData } from '../types'
import { convertData } from '../utils/conver-data'

const props = withDefaults(
  defineProps<{
    mapData: IData[]
    title?: string
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: props.title,
      left: 'center',
      textStyle: {
        color: '#555'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    legend: {
      orient: 'vertical',
      right: 20,
      top: 10,
      data: ['销售量'],
      textStyle: {
        color: '#000'
      }
    },
    visualMap: {
      min: 0,
      max: 100000,
      left: 20,
      bottom: 20,
      calculable: false,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#000'
      }
    },
    // 绘制地图
    geo: {
      // 地图名为 china
      map: 'china',
      roam: 'scale',
      // 地图中每个地域的颜色
      itemStyle: {
        areaColor: 'rgb(19, 91, 153)',
        borderColor: 'rgb(9, 54, 95)'
      },
      // hover 地区颜色
      emphasis: {
        itemStyle: {
          areaColor: 'rgb(10, 105, 187)'
        }
      }
    },
    series: [
      {
        name: '销售量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            show: false
          }
        }
      },
      {
        type: 'map',
        // 使用的地图
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  }
})
</script>

<style scoped></style>
