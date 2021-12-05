import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 获取所有 route 组件
  const allRoutes: RouteRecordRaw[] = []
  // 基于 webpack(并非node环境下) require.context(需要读取的文件, 是否递归查找, 匹配的文件正则).keys() 返回查找到的文件的路径
  require
    .context('@/router/main', true, /\.ts/)
    .keys()
    .forEach((key) => {
      const route = require('@/router/main' + key.split('.')[1])
      allRoutes.push(route.default)
    })

  // 根据 userMenus 获取需要添加的 route
  const _recurseGetRoute = (menus: any[]): void => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
