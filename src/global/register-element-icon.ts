import * as ElIconModules from '@element-plus/icons'
import type { App } from 'vue'

export default function registerElementIcon(app: App): void {
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }
}
