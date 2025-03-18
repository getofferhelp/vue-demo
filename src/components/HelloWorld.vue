<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <div class="header-content">
      <h1>
        <router-link to="/" class="green">{{ msg }}</router-link>
      </h1>
    </div>
  </div>
</template>

<style scoped>
.header-content {
  margin-bottom: 20px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin: 0;
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}

/* 添加链接样式 */
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.green:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
