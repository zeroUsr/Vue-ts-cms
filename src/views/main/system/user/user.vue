<template>
  <div class="user">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @handleResetClick="handleResetClick"
        @handleQueryClick="handleQueryClick"
      />
    </div>
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #enable="scope">
          <el-button
            plain
            size="mini"
            :type="scope.row.enable ? 'success' : 'danger'"
          >
            {{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
      </page-content>
    </div>
    <div class="modal">
      <page-modal
        ref="pageModalRef"
        pageName="users"
        :modalConfig="modalConfigRef"
        :defaultInfo="defaultInfo"
      ></page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    pageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 处理密码框显示/隐藏
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.filed === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    // 动态获取部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.filed === 'departmentId'
      )
      if (departmentItem?.options) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { title: item.name, value: item.id }
        })
      }

      const roleItem = modalConfig.formItems.find(
        (item) => item.filed === 'roleId'
      )
      if (roleItem?.options) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      return modalConfig
    })

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped>
.content {
  padding: 30px;
  border-top: 20px solid #f5f5f5;
}
</style>
