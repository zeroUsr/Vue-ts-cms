<template>
  <div class="page-content">
    <zero-table :listData="dataList" v-bind="contentTableConfig">
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filter.format(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filter.format(scope.row.updateAt) }}</span>
      </template>
      <template #handle>
        <div class="handle">
          <el-button type="text" size="mini">
            <el-icon><edit /></el-icon>
            编辑
          </el-button>
          <el-button type="text" size="mini">
            <el-icon><delete-filled /></el-icon>
            删除
          </el-button>
        </div>
      </template>
    </zero-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import ZeroTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    ZeroTable
  },
  setup(props) {
    const store = useStore()

    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    return {
      dataList
    }
  }
})
</script>

<style scoped></style>
