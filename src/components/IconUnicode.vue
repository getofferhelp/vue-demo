<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { unicodeCategories, getUnicodeIcons, getUnicodeCategoryCount } from '../data/icons'

const { t } = useI18n()
const searchTerm = ref('')
const activeCategory = ref('')

// 添加带数量的分类列表
const categoriesWithCount = computed(() => {
  return unicodeCategories.map((category) => ({
    name: category,
    count: getUnicodeCategoryCount(category),
  }))
})

const filteredIcons = computed(() => {
  let icons = getUnicodeIcons(activeCategory.value)

  if (searchTerm.value) {
    const searchLower = searchTerm.value.toLowerCase()
    icons = icons.filter((icon) => icon.name.toLowerCase().includes(searchLower))
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
      toastMessage.value =
        copyType === 'name' ? t('copy.success.name') : t('copy.success.character')
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    })
    .catch((err) => console.error(t('copy.failed'), err))
}
</script>

<template>
  <div class="icon-showcase">
    <div class="search-box">
      <input
        v-model="searchTerm"
        type="text"
        :placeholder="t('search.placeholder.unicode')"
        class="search-input"
      />
    </div>

    <div class="categories">
      <button :class="{ active: activeCategory === '' }" @click="activeCategory = ''">
        {{ t('tabs.unicode') }}
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
      <div v-for="icon in filteredIcons" :key="icon.name" class="icon-item">
        <div class="icon-display">{{ icon.icon }}</div>
        <span class="icon-name">{{ icon.name }}</span>
        <div class="copy-buttons">
          <button @click="copyIcon(icon, 'name')" :title="t('copy.name')">
            {{ t('copy.name') }}
          </button>
          <button @click="copyIcon(icon, 'icon')" :title="t('copy.character')">
            {{ t('copy.character') }}
          </button>
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
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 16px;
  background: var(--color-background);
  color: var(--color-text);
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
  border: 1px solid var(--color-border);
  border-radius: 4px;
  min-height: 100px;
  background: var(--color-background);
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

.categories {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.categories button {
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}

.categories button.active {
  background: var(--color-text);
  color: var(--color-background);
  border-color: var(--color-text);
}
</style>
