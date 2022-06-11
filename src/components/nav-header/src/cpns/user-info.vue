<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30"></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><user /></el-icon>
            用户中心
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><setting /></el-icon>
            系统管理
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleExitClick">
            <el-icon><circle-close /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import localcache from '@/utils/cache'

export default defineComponent({
  setup() {
    const name = localcache.getCache('userInfo').name

    const router = useRouter()
    const handleExitClick = () => {
      localcache.deleteCache('token')
      router.push('/main')
    }

    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      padding-left: 20px;
    }
  }
}

.el-dropdown-menu__item {
  justify-content: center;
}
</style>
