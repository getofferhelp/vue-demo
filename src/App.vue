<script setup lang="ts">
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, provide } from 'vue'
import { useI18n } from 'vue-i18n'

// 暗色模式状态
const isDark = ref(false)
const { locale } = useI18n()

// 切换暗色模式
const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const languageLabels = {
  zh: '🇨🇳',
  en: '🇺🇸',
  es: '🇪🇸',
}

const toggleLanguage = (lang: string) => {
  locale.value = lang
}

// 提供给子组件使用
provide('isDark', isDark)
provide('toggleDark', toggleDark)
</script>

<template>
  <div :class="{ dark: isDark }">
    <!-- 添加固定定位的控件容器 -->
    <div class="global-controls">
      <div class="language-dropdown">
        <button class="language-btn">
          {{ languageLabels[locale as keyof typeof languageLabels] }}
          <div class="dropdown-content">
            <button v-if="locale !== 'zh'" @click="toggleLanguage('zh')" class="dropdown-item">
              🇨🇳
            </button>
            <button v-if="locale !== 'en'" @click="toggleLanguage('en')" class="dropdown-item">
              🇺🇸
            </button>
            <button v-if="locale !== 'es'" @click="toggleLanguage('es')" class="dropdown-item">
              🇪🇸
            </button>
          </div>
        </button>
      </div>
      <button @click="toggleDark" class="theme-toggle">
        <font-awesome-icon :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']" />
      </button>
    </div>

    <header>
      <div class="wrapper">
        <HelloWorld msg="多种工具" />
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
/* 添加根级别的主题变量 */
:root {
  --color-background: #ffffff;
  --color-text: #213547;
  --color-background-soft: #f9f9f9;
}

:root.dark {
  --color-background: #213547;
  --color-text: #ffffff;
  --color-background-soft: #2c4159;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.global-controls {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1280px;
  padding: 0 2rem;
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.global-controls {
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
  display: flex;
  align-items: center;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: calc(100% + 5px);
  right: 50%;
  transform: translateX(50%);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 6px;
  min-width: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
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
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 1.2rem;
}

.dropdown-item:hover {
  background: var(--color-background-soft);
}

/* 添加一个小三角形指示器 */
.dropdown-content::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 50%;
  transform: translateX(50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid var(--color-border);
}

.dropdown-content::after {
  content: '';
  position: absolute;
  top: -5px;
  right: 50%;
  transform: translateX(50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--color-background);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 1.2rem;
  color: var(--color-text);
}
</style>
