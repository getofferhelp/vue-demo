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

const copyIcon = (icon: { name: string; icon: string }, copyType: 'name' | 'icon') => {
  const textToCopy = copyType === 'name' ? icon.name : icon.icon
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // 处理复制成功
    })
    .catch((err) => console.error('复制失败:', err))
}
</script>

<template>
  <div class="icon-showcase">
    <div class="search-box">
      <input v-model="searchTerm" type="text" placeholder="搜索 Unicode Emoji..." />
    </div>

    <div class="categories">
      <button :class="{ active: activeCategory === '' }" @click="activeCategory = ''">全部</button>
      <button
        v-for="category in unicodeEmojiCategories"
        :key="category"
        :class="{ active: activeCategory === category }"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="icon-list">
      <div v-for="emoji in filteredEmojis" :key="emoji.id" class="icon-item">
        <div class="icon-display">{{ emoji.icon }}</div>
        <span class="icon-name">{{ emoji.name }}</span>
        <div class="copy-buttons">
          <button @click="copyIcon(emoji, 'name')">复制名称</button>
          <button @click="copyIcon(emoji, 'icon')">复制图标</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 使用与原来相同的样式 */
</style>
