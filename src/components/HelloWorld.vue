<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

defineProps<{
  msg: string
}>()

const toggleDark = inject('toggleDark') as () => void
const isDark = inject('isDark') as Ref<boolean>
</script>

<template>
  <div class="greetings">
    <div class="header-content">
      <h1>
        <router-link to="/" class="green">{{ msg }}</router-link>
      </h1>
      <button @click="toggleDark" class="theme-toggle">
        <font-awesome-icon :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin: 0;
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
