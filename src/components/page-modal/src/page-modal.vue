<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      destroy-on-close
      center
    >
      <zero-form v-bind="modalConfig" v-model="listData"></zero-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import ZeroForm from '@/base-ui/form'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    ZeroForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const listData = ref({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          listData.value[item.filed] = newValue[item.filed]
        }
      }
    )

    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 编辑
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch('system/editDataAction', {
          pageName: props.pageName,
          newData: { ...listData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log(props.otherInfo)
        store.dispatch('system/createDataAction', {
          pageName: props.pageName,
          newData: { ...listData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      listData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
