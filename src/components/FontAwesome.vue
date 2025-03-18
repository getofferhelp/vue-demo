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

// 辅助函数：转换图标名称
const convertIconName = (key: string): string => {
  // 1. 移除 'fa' 前缀
  // 2. 将驼峰命名转换为连字符格式
  return key
    .replace(/^fa/, '')
    .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
    .replace(/^-/, '') // 移除开头可能出现的连字符
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

// 过滤图标的计算属性
const filteredSolidIcons = computed(() =>
  solidIcons.filter((icon) => icon.name.includes(searchTerm.value.toLowerCase())),
)

const filteredRegularIcons = computed(() =>
  regularIcons.filter((icon) => icon.name.includes(searchTerm.value.toLowerCase())),
)

const filteredBrandIcons = computed(() =>
  brandIcons.filter((icon) => icon.name.includes(searchTerm.value.toLowerCase())),
)

const showToast = ref(false)
const toastMessage = ref('')

// 修改复制功能
const copyIconName = (iconName: string) => {
  navigator.clipboard
    .writeText(iconName)
    .then(() => {
      toastMessage.value = '名称已复制！'
      showToast.value = true
      // 3秒后自动隐藏
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
        <div
          v-for="icon in filteredSolidIcons"
          :key="`${icon.type}-${icon.name}`"
          class="icon-item"
          @click="copyIconName(icon.name)"
        >
          <BaseIcon :name="icon.name" :type="icon.type" size="lg" />
          <span class="icon-name">{{ icon.name }}</span>
        </div>
      </div>

      <div v-if="activeTab === 'regular'" class="icon-list">
        <div
          v-for="icon in filteredRegularIcons"
          :key="`${icon.type}-${icon.name}`"
          class="icon-item"
          @click="copyIconName(icon.name)"
        >
          <BaseIcon :name="icon.name" :type="icon.type" size="lg" />
          <span class="icon-name">{{ icon.name }}</span>
        </div>
      </div>

      <div v-if="activeTab === 'brands'" class="icon-list">
        <div
          v-for="icon in filteredBrandIcons"
          :key="`${icon.type}-${icon.name}`"
          class="icon-item"
          @click="copyIconName(icon.name)"
        >
          <BaseIcon :name="icon.name" :type="icon.type" size="lg" />
          <span class="icon-name">{{ icon.name }}</span>
        </div>
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
}

.tabs {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.tabs button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.tabs button.active {
  background: #4caf50;
  color: white;
}

.icons-grid {
  margin-top: 20px;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-item:hover {
  background: #f5f5f5;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
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
</style>
