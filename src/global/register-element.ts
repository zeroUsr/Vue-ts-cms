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
  ElMenu
} from 'element-plus'

const components = [
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
  ElMenu,
  ElSubMenu,
  ElMenuItem
]

export default function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
