<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleResetClick="handleResetClick"
      @handleQueryClick="handleQueryClick"
    ></page-search>
    <div class="content">
      <page-content
        ref="pageContentRef"
        pageName="role"
        :contentTableConfig="contentTableConfig"
        createAction="新建角色"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
      </page-content>
      <page-modal
        ref="pageModalRef"
        :modalConfig="modalConfig"
        :otherInfo="otherInfo"
        :defaultInfo="defaultInfo"
        pageName="role"
      >
        <div class="modal-tree">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            @check="handleCheckChange"
            :props="{ children: 'children', label: 'name' }"
          /></div
      ></page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { useStore } from '@/store'

import { ElTree } from 'element-plus'

import { mapMenusToLeafKeys } from '@/utils/map-menus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()

    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 添加角色
    const otherInfo = ref({})
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys: number[] = mapMenusToLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)
    const menus = computed(() => store.state.entireMenu)
    const handleCheckChange = (data1: any, data2: any) => {
      const { checkedKeys, halfCheckedKeys } = data2
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      otherInfo,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      elTreeRef,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 30px;
  border-top: 20px solid #f5f5f5;

  .modal-tree {
    margin-left: 30px;
  }
}
</style>
