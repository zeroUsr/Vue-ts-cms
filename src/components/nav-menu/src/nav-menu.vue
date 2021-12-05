<template>
  <div class="nav-menu">
    <!-- 展示 logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+Ts</span>
    </div>
    <!-- 展示用户菜单 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <!-- 二级菜单标题 -->
            <template #title>
              <template v-if="item.icon === 'el-icon-monitor'">
                <el-icon><monitor /></el-icon>
              </template>
              <template v-else-if="item.icon === 'el-icon-setting'">
                <el-icon><setting /></el-icon>
              </template>
              <template v-else-if="item.icon === 'el-icon-goods'">
                <el-icon><goods /></el-icon>
              </template>
              <template v-else-if="item.icon === 'el-icon-chat-line-round'">
                <el-icon><chat-line-round /></el-icon>
              </template>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单内容 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="menuItomClick(subItem)"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else>
          <el-menu-item :index="item.id + ''">{{ item.name }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from '@/store'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const userMenus = computed(() => store.state.login.userMenus)

    const menuItomClick = (menu: any) => {
      router.push({
        path: menu.url
      })
    }

    return {
      userMenus,
      menuItomClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;

    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .is-active {
      color: #fff !important;
      background-color: #0a60bd !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
