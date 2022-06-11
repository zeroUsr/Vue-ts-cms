import { useStore } from '@/store'

export function usePermissions(pageName: string, handleName: string) {
  const permission = useStore().state.login.permission
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permission.find((item) => item === verifyPermission)
}
