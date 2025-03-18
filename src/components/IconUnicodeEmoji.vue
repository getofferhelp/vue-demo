<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  unicodeEmojiIcons,
  unicodeEmojiCategories,
  getUnicodeEmojisByCategory,
} from '../data/unicodeEmojiIcons'

const searchTerm = ref('')
const activeCategory = ref('')

const filteredEmojis = computed(() => {
  let emojis = activeCategory.value
    ? getUnicodeEmojisByCategory(activeCategory.value)
    : unicodeEmojiIcons

  if (searchTerm.value) {
    const searchLower = searchTerm.value.toLowerCase()
    emojis = emojis.filter(
      (emoji) =>
        emoji.name.toLowerCase().includes(searchLower) ||
        emoji.keywords.some((k) => k.toLowerCase().includes(searchLower)),
    )
  }

  return emojis
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
    .catch((err) => console.error('复制失败:', err))
}

// 添加计算分类数量的函数
const getCategoryCount = (category: string) => {
  return unicodeEmojiIcons.filter((emoji) => emoji.category === category).length
}

// 添加带数量的分类列表计算属性
const categoriesWithCount = computed(() => {
  return unicodeEmojiCategories.map((category) => ({
    name: category,
    count: getCategoryCount(category),
  }))
})
</script>

<template>
  <div class="icon-showcase">
    <div v-if="!unicodeEmojiIcons.length" class="debug-info">
      No emojis loaded. Total icons: {{ unicodeEmojiIcons.length }}
    </div>

    <div class="search-box">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="搜索 Unicode Emoji..."
        class="search-input"
      />
    </div>

    <div class="categories">
      <button :class="{ active: activeCategory === '' }" @click="activeCategory = ''">
        全部 ({{ unicodeEmojiIcons.length }})
      </button>
      <button
        v-for="category in categoriesWithCount"
        :key="category.name"
        :class="{ active: activeCategory === category.name }"
        @click="activeCategory = category.name"
      >
        {{ category.name }} ({{ category.count }})
      </button>
    </div>

    <div class="icon-list">
      <div v-for="emoji in filteredEmojis" :key="emoji.id" class="icon-item">
        <div class="icon-display">{{ emoji.icon }}</div>
        <span class="icon-name">{{ emoji.name }}</span>
        <div class="copy-buttons">
          <button @click="copyIcon(emoji, 'name')" title="复制图标名称">复制名称</button>
          <button @click="copyIcon(emoji, 'icon')" title="复制图标">复制图标</button>
        </div>
      </div>
    </div>

    <div v-if="showToast" class="toast">
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
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

.categories {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.categories button {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.categories button.active {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
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

.debug-info {
  padding: 20px;
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
