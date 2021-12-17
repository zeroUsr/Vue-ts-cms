<template>
  <div class="nav-header">
    <div class="fold" @click="changeFold">
      <el-icon v-if="collapse" size="30"><expand /></el-icon>
      <el-icon v-else size="30"><fold /></el-icon>
    </div>
    <div class="content">
      <zero-breadcurmb :breadcurmbs="breadcurmbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

import UserInfo from './cpns/user-info.vue'
import ZeroBreadcurmb from '@/base-ui/breadcurmb'
import { useStore } from '@/store'
import { pathMapToBreadcurmb } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['changeFold'],
  components: {
    UserInfo,
    ZeroBreadcurmb
  },
  setup(props, { emit }) {
    // 是否展开菜单
    const changeFold = () => {
      emit('changeFold')
    }

    const store = useStore()
    const route = useRoute()
    const useMenus = store.state.login.userMenus
    const breadcurmbs = computed(() => {
      // 根据路径的更新重新获取当前路径
      const currentPath = route.path
      return pathMapToBreadcurmb(useMenus, currentPath)
    })

    return {
      changeFold,
      breadcurmbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;

  .fold {
    cursor: pointer;
    margin-top: 4px;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
