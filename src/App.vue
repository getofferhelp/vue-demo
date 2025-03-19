<script setup lang="ts">
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, provide } from 'vue'

// 暗色模式状态
const isDark = ref(false)

// 切换暗色模式
const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

// 提供给子组件使用
provide('isDark', isDark)
provide('toggleDark', toggleDark)
</script>

<template>
  <div :class="{ dark: isDark }" class="app-container">
    <button @click="toggleDark" class="theme-toggle">
      <font-awesome-icon :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']" />
    </button>

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
}

:root.dark {
  --color-background: #213547;
  --color-text: #ffffff;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>

<style scoped>
.app-container {
  position: relative;
  width: 90vw;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: max(20px, calc((100% - 1000px) / 2 + 20px));
  z-index: 1000;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
  background: var(--color-background-soft);
  transform: scale(1.05);
}

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
</style>
