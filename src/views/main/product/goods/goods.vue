<template>
  <div class="goods">
    <div class="content">
      <page-content :contentTableConfig="contentTableConfig" pageName="goods">
        <template #oldPrice="scope">￥{{ scope.row.oldPrice }} </template>
        <template #newPrice="scope">￥{{ scope.row.newPrice }} </template>
        <template #status="scope">
          <el-button
            plain
            size="mini"
            :type="scope.row.status ? 'success' : 'danger'"
          >
            {{ scope.row.status ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template #image="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
          >
          </el-image>
        </template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
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
