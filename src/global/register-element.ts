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
  ElLink
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
  ElLink
]

export default function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
