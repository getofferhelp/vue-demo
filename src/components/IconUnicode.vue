<script setup lang="ts">
import { ref, computed } from 'vue'
import { unicodeBlockCategories, getIconsByCategory } from '../data/icons'

const searchTerm = ref('')
const activeSubCategory = ref('')

const subCategories = computed(() => unicodeBlockCategories)

const filteredIcons = computed(() => {
  let icons = getIconsByCategory('unicode', activeSubCategory.value)

  if (searchTerm.value) {
    icons = icons.filter((icon) => icon.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
  }

  return icons
})

const showToast = ref(false)
const toastMessage = ref('')

const copyIcon = (icon: { name: string; icon: string }, copyType: 'name' | 'icon') => {
  const textToCopy = copyType === 'name' ? icon.name : icon.icon
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      toastMessage.value = copyType === 'name' ? '名称已复制！' : '图标已复制！'
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
  <div class="icon-showcase">
    <div class="search-box">
      <input v-model="searchTerm" type="text" placeholder="搜索符号..." class="search-input" />
    </div>

    <!-- 移除主分类，只保留 Unicode 子分类 -->
    <div class="sub-categories">
      <button
        v-for="category in subCategories"
        :key="category"
        :class="{ active: activeSubCategory === category }"
        @click="activeSubCategory = category"
      >
        {{ category }}
      </button>
      <button :class="{ active: activeSubCategory === '' }" @click="activeSubCategory = ''">
        全部
      </button>
    </div>

    <div class="icon-list">
      <div v-for="icon in filteredIcons" :key="icon.name" class="icon-item">
        <div class="icon-display">{{ icon.icon }}</div>
        <span class="icon-name">{{ icon.name }}</span>
        <div class="copy-buttons">
          <button @click="copyIcon(icon, 'name')" title="复制图标名称">复制名称</button>
          <button @click="copyIcon(icon, 'icon')" title="复制图标">复制图标</button>
        </div>
      </div>
    </div>

    <div v-if="showToast" class="toast">
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
/* 使用与 IconEmoji 相同的样式 */
.icon-showcase {
  padding: 20px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

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

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  min-height: 100px;
}

.icon-display {
  font-size: 24px;
  margin-bottom: 8px;
}

.icon-name {
  font-size: 11px;
  text-align: center;
  word-break: break-all;
  margin-bottom: 4px;
}

.copy-buttons {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.copy-buttons button {
  font-size: 10px;
  padding: 2px 4px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-buttons button:hover {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}

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

.sub-categories {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sub-categories button {
  font-size: 12px;
  padding: 4px 8px;
}
</style>
