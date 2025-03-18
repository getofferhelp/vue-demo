<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  msg: string
}>()

const toggleDark = inject('toggleDark') as () => void
const isDark = inject('isDark') as Ref<boolean>
const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
</script>

<template>
  <div class="greetings">
    <div class="header-content">
      <h1>
        <router-link to="/" class="green">{{ msg }}</router-link>
      </h1>
      <div class="controls">
        <div class="language-dropdown">
          <button class="language-btn">
            {{ locale === 'zh' ? '中' : 'En' }}
            <div class="dropdown-content">
              <button v-if="locale === 'zh'" @click="toggleLanguage" class="dropdown-item">
                En
              </button>
              <button v-else @click="toggleLanguage" class="dropdown-item">中</button>
            </div>
          </button>
        </div>
        <button @click="toggleDark" class="theme-toggle">
          <font-awesome-icon :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin: 0;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.language-dropdown {
  position: relative;
}

.language-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 1.2rem;
  color: var(--color-text);
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 4px;
  min-width: 60px;
  z-index: 1000;
}

.language-btn:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  width: 100%;
  padding: 4px 8px;
  border: none;
  background: none;
  color: var(--color-text);
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}

.dropdown-item:hover {
  background: var(--color-background-soft);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 1.2rem;
  color: var(--color-text);
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}
</style>
