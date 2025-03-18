<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import * as fas from '@fortawesome/free-solid-svg-icons'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'

type IconType = 'fas' | 'far' | 'fab'

interface IconInfo {
  name: string
  type: IconType
}

// 更新图标名称映射
const iconNameMap: Record<string, string> = {
  // 温度图标
  temperature0: 'temperature-empty',
  temperature1: 'temperature-quarter',
  temperature2: 'temperature-half',
  temperature3: 'temperature-three-quarters',
  temperature4: 'temperature-full',

  // 温度计图标
  thermometer0: 'thermometer-empty',
  thermometer1: 'thermometer-quarter',
  thermometer2: 'thermometer-half',
  thermometer3: 'thermometer-three-quarters',
  thermometer4: 'thermometer-full',

  // WiFi图标
  wifi0: 'wifi-slash',
  wifi1: 'wifi-weak',
  wifi2: 'wifi-fair',
  wifi3: 'wifi',

  // 箭头数字组合
  arrowdown19: 'arrow-down-1-9',
  arrowdown91: 'arrow-down-9-1',
  arrowup19: 'arrow-up-1-9',
  arrowup91: 'arrow-up-9-1',

  // 骰子图标
  diced20: 'dice-d20',
  d20: 'dice-d20',
  diced6: 'dice-d6',
  d6: 'dice-d6',

  // 列表
  list12: 'list-ol',

  // 品牌图标
  css3: 'css3',
  css3alt: 'css3-alt',
  draft2digital: 'draft2digital',
  html5: 'html5',
  ns8: 'ns8',
  page4: 'page4',
  typo3: 'typo3',
}

// 添加类型定义
type IconLibrary = Record<IconType, Set<string>>

// 添加有效的单字母图标列表
const validSingleLetters: IconLibrary = {
  far: new Set(['r']), // far 库中有效的单字母图标
  fab: new Set(['b']), // fab 库中有效的单字母图标
  fas: new Set([]), // fas 库中有效的单字母图标
}

// 修改图标名称转换函数
const convertIconName = (key: string): string => {
  // 1. 移除 'fa' 前缀
  let converted = key.replace(/^fa/, '')

  // 2. 将驼峰命名转换为连字符格式
  converted = converted
    .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
    .replace(/([0-9]+)/g, '-$1')
    .replace(/^-/, '')
    .replace(/-+/g, '-')

  // 3. 检查是否需要特殊映射
  const cleanKey = converted.replace(/[-\s]/g, '').toLowerCase()
  const mappedName = iconNameMap[cleanKey]
  if (mappedName) {
    return mappedName
  }

  return converted
}

// 获取所有图标并添加类型注解
const solidIcons: IconInfo[] = Object.keys(fas)
  .filter((key) => key.startsWith('fa'))
  .map((key) => ({
    name: convertIconName(key),
    type: 'fas' as IconType,
  }))

const regularIcons: IconInfo[] = Object.keys(far)
  .filter((key) => key.startsWith('fa'))
  .map((key) => ({
    name: convertIconName(key),
    type: 'far' as IconType,
  }))

const brandIcons: IconInfo[] = Object.keys(fab)
  .filter((key) => key.startsWith('fa'))
  .map((key) => ({
    name: convertIconName(key),
    type: 'fab' as IconType,
  }))

const activeTab = ref('solid')

// 可选：添加搜索功能
const searchTerm = ref('')

// 使用 Map 缓存图标验证结果
const iconValidationCache = new Map<string, boolean>()

// 优化图标验证函数
const isValidIcon = (iconName: string, type: IconType): boolean => {
  const cacheKey = `${type}-${iconName}`

  if (iconValidationCache.has(cacheKey)) {
    const cachedResult = iconValidationCache.get(cacheKey)
    return cachedResult ?? false
  }

  // 检查单字母图标
  if (iconName.length === 1) {
    const isValidSingleLetter = validSingleLetters[type].has(iconName.toLowerCase())
    iconValidationCache.set(cacheKey, isValidSingleLetter)
    return isValidSingleLetter
  }

  const library = type === 'fas' ? fas : type === 'far' ? far : fab
  const isValid = Object.keys(library).some((key) => {
    const convertedName = convertIconName(key)
    return convertedName === iconName
  })

  iconValidationCache.set(cacheKey, isValid)
  return isValid
}

// 预处理图标数据
const processIcons = (icons: IconInfo[]): IconInfo[] => {
  return icons.filter((icon) => isValidIcon(icon.name, icon.type))
}

// 预先过滤无效图标
const validSolidIcons = processIcons(solidIcons)
const validRegularIcons = processIcons(regularIcons)
const validBrandIcons = processIcons(brandIcons)

// 优化计算属性
const filteredSolidIcons = computed(() =>
  validSolidIcons.filter((icon) => icon.name.includes(searchTerm.value.toLowerCase())),
)

const filteredRegularIcons = computed(() =>
  validRegularIcons.filter((icon) => icon.name.includes(searchTerm.value.toLowerCase())),
)

const filteredBrandIcons = computed(() =>
  validBrandIcons.filter((icon) => icon.name.includes(searchTerm.value.toLowerCase())),
)

const showToast = ref(false)
const toastMessage = ref('')

// 修改复制功能
const copyIconName = (icon: IconInfo, copyType: 'name' | 'html') => {
  let textToCopy = ''
  if (copyType === 'name') {
    textToCopy = icon.name
    toastMessage.value = '名称已复制！'
  } else {
    textToCopy = `<i class="${icon.type} fa-${icon.name}"></i>`
    toastMessage.value = '代码已复制！'
  }

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    })
    .catch((err) => {
      console.error('复制失败:', err)
    })
}
</script>

<template>
  <div class="font-awesome-showcase">
    <!-- 添加搜索框 -->
    <div class="search-box">
      <input v-model="searchTerm" type="text" placeholder="搜索图标..." class="search-input" />
    </div>

    <!-- 标签页切换 -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'solid' }" @click="activeTab = 'solid'">
        实心图标 ({{ filteredSolidIcons.length }})
      </button>
      <button :class="{ active: activeTab === 'regular' }" @click="activeTab = 'regular'">
        线框图标 ({{ filteredRegularIcons.length }})
      </button>
      <button :class="{ active: activeTab === 'brands' }" @click="activeTab = 'brands'">
        品牌图标 ({{ filteredBrandIcons.length }})
      </button>
    </div>

    <!-- 图标展示区域 -->
    <div class="icons-grid">
      <div v-if="activeTab === 'solid'" class="icon-list">
        <template v-for="icon in filteredSolidIcons" :key="`${icon.type}-${icon.name}`">
          <div v-show="icon.name.includes(searchTerm.toLowerCase())" class="icon-item">
            <BaseIcon :name="icon.name" :type="icon.type" size="lg" />
            <span class="icon-name">{{ icon.name }}</span>
            <div class="copy-buttons">
              <button @click="copyIconName(icon, 'name')" title="复制图标名称">名称</button>
              <button @click="copyIconName(icon, 'html')" title="复制HTML代码">代码</button>
            </div>
          </div>
        </template>
      </div>

      <div v-if="activeTab === 'regular'" class="icon-list">
        <template v-for="icon in filteredRegularIcons" :key="`${icon.type}-${icon.name}`">
          <div v-show="icon.name.includes(searchTerm.toLowerCase())" class="icon-item">
            <BaseIcon :name="icon.name" :type="icon.type" size="lg" />
            <span class="icon-name">{{ icon.name }}</span>
            <div class="copy-buttons">
              <button @click="copyIconName(icon, 'name')" title="复制图标名称">复制名称</button>
              <button @click="copyIconName(icon, 'html')" title="复制HTML代码">复制代码</button>
            </div>
          </div>
        </template>
      </div>

      <div v-if="activeTab === 'brands'" class="icon-list">
        <template v-for="icon in filteredBrandIcons" :key="`${icon.type}-${icon.name}`">
          <div v-show="icon.name.includes(searchTerm.toLowerCase())" class="icon-item">
            <BaseIcon :name="icon.name" :type="icon.type" size="lg" />
            <span class="icon-name">{{ icon.name }}</span>
            <div class="copy-buttons">
              <button @click="copyIconName(icon, 'name')" title="复制图标名称">复制名称</button>
              <button @click="copyIconName(icon, 'html')" title="复制HTML代码">复制代码</button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 添加 Toast 组件 -->
    <div v-if="showToast" class="toast">
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
.font-awesome-showcase {
  padding: 20px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.tabs {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.tabs button {
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
}

.tabs button.active {
  background: var(--color-primary);
  color: white;
}

.icons-grid {
  margin-top: 20px;
}

.icon-list {
  contain: content;
  will-change: transform;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  width: 100%;
}

.icon-item {
  contain: layout style paint;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 100px;
  background: var(--color-background);
}

.icon-item:hover {
  background: var(--color-background-soft);
  transform: scale(1.05);
}

.icon-name {
  margin-top: 4px;
  font-size: 11px;
  text-align: center;
  word-break: break-all;
}

/* 添加搜索框样式 */
.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 16px;
  background: var(--color-background);
  color: var(--color-text);
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
}

/* 添加空状态提示 */
.icon-list:empty::after {
  content: '没有找到匹配的图标';
  display: block;
  text-align: center;
  padding: 20px;
  color: #666;
}

/* 添加 Toast 样式 */
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 1000;
  animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.copy-buttons {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.copy-buttons button {
  font-size: 10px;
  padding: 2px 4px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}

.copy-buttons button:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* 优化渲染性能的样式 */
.icon-list {
  contain: content;
  will-change: transform;
}

.icon-item {
  contain: layout style paint;
}

@media (min-width: 1024px) {
  .icon-list {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .icon-item {
    min-height: 120px;
  }

  .icon-name {
    font-size: 12px;
  }

  .copy-buttons button {
    font-size: 11px;
    padding: 3px 6px;
  }
}
</style>
