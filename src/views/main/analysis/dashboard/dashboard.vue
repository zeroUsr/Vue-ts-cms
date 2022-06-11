<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <zero-card title="分类商品数量（饼图）">
          <pie-echart :pie-data="categoryGoodsCount"></pie-echart>
        </zero-card>
      </el-col>
      <el-col :span="10">
        <zero-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </zero-card>
      </el-col>
      <el-col :span="7">
        <zero-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart
        ></zero-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <zero-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </zero-card>
      </el-col>
      <el-col :span="12">
        <zero-card title="分类商品的收藏"
          ><bar-echart v-bind="categoryGoodsFavor"></bar-echart
        ></zero-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import ZeroCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    ZeroCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() =>
      store.state.dashboard.categoryGoodsCount.map((item) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    )

    const categoryGoodsSale = computed(() => {
      const labels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        labels.push(item.name)
        values.push(item.goodsCount)
      }

      return {
        xLabels: labels,
        values: values
      }
    })

    const categoryGoodsFavor = computed(() => {
      const labels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        labels.push(item.name)
        values.push(item.goodsFavor)
      }

      return {
        xLabels: labels,
        values: values
      }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item) => {
        return {
          name: item.address,
          value: item.count
        }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
