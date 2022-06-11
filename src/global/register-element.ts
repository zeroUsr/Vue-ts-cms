import { App } from 'Vue'

import './register-element-css'
import {
  ElButton,
  ElTabs,
  ElTable,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElSubMenu,
  ElMenuItem,
  ElMenu,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElOption,
  ElSelect,
  ElDatePicker,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
} from 'element-plus'

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElOption,
  ElSelect,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
]

export default function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
