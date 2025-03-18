<script setup lang="ts">
defineProps<{
  msg: string
}>()

const links = [
  { path: '/icons', name: 'Font Awesome' },
  { path: '/unicode', name: 'Unicode 字符' },
  { path: '/unicode-emoji', name: 'Unicode Emoji' },
]
</script>

<template>
  <div class="greetings">
    <h1>
      <router-link to="/" class="green">{{ msg }}</router-link>
    </h1>
    <nav>
      <router-link v-for="link in links" :key="link.path" :to="link.path">
        {{ link.name }}
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

a {
  display: inline;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

nav {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
}

nav a:hover {
  background: var(--color-background-soft);
}

nav a.router-link-active {
  color: var(--color-primary);
  font-weight: bold;
}
</style>
