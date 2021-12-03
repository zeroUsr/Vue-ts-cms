import { App } from 'vue'

import registerElement from './register-element'
import registerElementIcon from './register-element-icon'

export function globalRegister(app: App): void {
  // 普通调用
  // registerElement(app)
  // 插件方式调用
  app.use(registerElement)
  app.use(registerElementIcon)
}
