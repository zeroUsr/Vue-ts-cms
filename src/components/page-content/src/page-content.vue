<template>
  <div class="page-content">
    <zero-table
      :listData="listData"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <slot name="headerHandler"></slot>
        <template v-if="isCreate">
          <el-button
            type="primary"
            v-if="contentTableConfig.createAction"
            @click="handleNewClick"
          >
            {{ contentTableConfig.createAction }}
          </el-button>
        </template>
      </template>

      <!-- 注册公共插槽 -->
      <template #createAt="scope">
        <span>{{ $filter.format(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filter.format(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler">
          <el-button
            type="text"
            size="mini"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            <el-icon>
              <edit />
            </el-icon>
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="handleDeleteClick(scope.row)"
            v-if="isDelete"
          >
            <el-icon>
              <delete-filled />
            </el-icon>
            删除
          </el-button>
        </div>
      </template>

      <!-- 动态注册特有的插槽 -->
      <template
        v-for="item in otherPropSlot"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </zero-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { ElMessageBox, ElMessage } from 'element-plus'

import ZeroTable from '@/base-ui/table'

import { usePermissions } from '@/hooks/use-permissions'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    createAction: {
      type: String,
      default: ''
    }
  },
  components: {
    ZeroTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作权限
    const isCreate = usePermissions(props.pageName, 'create')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isQuery = usePermissions(props.pageName, 'query')
    const isDelete = usePermissions(props.pageName, 'delete')

    // 记录分页
    const pageInfo = ref({
      pageOffset: 1,
      pageSize: 10
    })

    // 监听分页重新获取数据
    watch(pageInfo, () => getPageData())

    // 从服务器请求数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset:
            (pageInfo.value.pageOffset - 1 < 0
              ? 0
              : pageInfo.value.pageOffset - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    const listData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    const otherPropSlot = (
      props.contentTableConfig.propList as Array<any>
    ).filter((item) => {
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    // 删除操作
    const handleDeleteClick = (item: any) => {
      ElMessageBox.confirm(`是否删除用户${item.name}`, '删除', {
        confirmButtonText: '是',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          store.dispatch('system/deleteDataAction', {
            pageName: props.pageName,
            id: item.id
          })
          ElMessage({
            type: 'success',
            message: `删除用户${item.name}成功`
          })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: `删除用户${item.name}失败`
          })
        })
    }

    // 新建用户
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      listData,
      isCreate,
      isDelete,
      isUpdate,
      getPageData,
      listCount,
      pageInfo,
      otherPropSlot,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
