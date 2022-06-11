<template>
  <div class="zero-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- @selection-change="selectionChange": 当多选框改变时触发此方法并获取其多选框的内容 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="selectionChange"
      v-bind="childrenProps"
    >
      <!-- 显示多选框 -->
      <el-table-column
        v-if="showSelectionColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <!-- 显示序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        width="80"
        label="序号"
      ></el-table-column>
      <!-- 显示表单数据 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 默认插槽并绑定一个值 -->
          <template #default="scope">
            <!-- 根据 slotName 动态决定插槽名 -->
            <!-- 传递 row 属性至外部使用插槽的 template -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 展示数据 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="isShowFooter">
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          :current-page="page.pageOffset"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ pageOffset: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    isShowFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const selectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    const handleCurrentChange = (pageOffset: number) => {
      emit('update:page', { ...props.page, pageOffset })
    }

    return {
      selectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px 20px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
    padding-bottom: 10px;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
