import * as echarts from 'echarts'
import mapChina from '../data/china.json'

// 注册 china 地图
echarts.registerMap('china', mapChina)

export function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el, undefined, { renderer: 'svg' })

  const setOption = (option: echarts.EChartsOption) => {
    echartInstance.setOption(option)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOption,
    updateSize
  }
}
