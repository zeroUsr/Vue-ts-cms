import { IBreadcurmb } from '@/base-ui/breadcurmb/types'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        if (!firstMenu) firstMenu = menu
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 根据 path 获取面包屑
export function pathMapToBreadcurmb(userMenus: any, path: any) {
  const breadcurmbs: IBreadcurmb[] = []
  pathMapToMenu(userMenus, path, breadcurmbs)
  return breadcurmbs
}

// 根据当前 path 获取用户菜单
export function pathMapToMenu(
  userMenus: any,
  path: string,
  breadcurmbs?: IBreadcurmb[]
): any {
  for (const userMenu of userMenus) {
    if (userMenu.type === 2 && userMenu.url === path) {
      return userMenu
    } else {
      const menu = pathMapToMenu(userMenu.children || [], path)
      if (menu) {
        breadcurmbs?.push({ name: userMenu.name })
        breadcurmbs?.push({ name: menu.name })
        return menu
      }
    }
  }
}

// 获取当前用户的权限permission
export function mapMenusToPermission(userMenus: any) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

// 获取用户的角色
export function mapMenusToLeafKeys(menuList: any[]) {
  const leafkeys: number[] = []
  const _recurseGetLeafkey = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeafkey(menu.children)
      } else {
        leafkeys.push(menu.id)
      }
    }
  }

  _recurseGetLeafkey(menuList)

  return leafkeys
}

export { firstMenu }
