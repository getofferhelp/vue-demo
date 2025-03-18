import { library } from '@fortawesome/fontawesome-svg-core'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import * as fas from '@fortawesome/free-solid-svg-icons'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'

// 类型守卫函数
const isIconDefinition = (value: unknown): value is IconDefinition => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'icon' in value &&
    Array.isArray((value as IconDefinition).icon)
  )
}

// 添加所有图标到库中
export const loadIcons = () => {
  // 将图标对象转换为数组并添加到库中
  const iconList = Object.values(fas).filter(isIconDefinition)

  const regularIconList = Object.values(far).filter(isIconDefinition)

  const brandIconList = Object.values(fab).filter(isIconDefinition)

  library.add(...iconList, ...regularIconList, ...brandIconList)
}
