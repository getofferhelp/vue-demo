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
  <div :class="{ dark: isDark }">
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
</style>
