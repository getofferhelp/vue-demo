<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import BaseIcon from './BaseIcon.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <BaseIcon name="info-circle" type="fas" size="2x" />
    </template>
    <template #heading>基础使用</template>
    <div class="demo-section">
      <BaseIcon name="user" />
      <code>&lt;BaseIcon name="user" /&gt;</code>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="regular" type="fas" size="2x" />
    </template>
    <template #heading>Regular 样式</template>
    <div class="demo-section">
      <BaseIcon name="user" type="far" />
      <code>&lt;BaseIcon name="user" type="far" /&gt;</code>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="brands" type="fas" size="2x" />
    </template>
    <template #heading>品牌图标</template>
    <div class="demo-section">
      <BaseIcon name="github" type="fab" />
      <code>&lt;BaseIcon name="github" type="fab" /&gt;</code>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="spinner" type="fas" size="2x" spin />
    </template>
    <template #heading>动画效果</template>
    <div class="demo-section">
      <BaseIcon name="spinner" spin />
      <code>&lt;BaseIcon name="spinner" spin /&gt;</code>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="ruler" type="fas" size="2x" />
    </template>
    <template #heading>自定义大小</template>
    <div class="demo-section sizes">
      <div>
        <BaseIcon name="coffee" size="xs" />
        <code>size="xs"</code>
      </div>
      <div>
        <BaseIcon name="coffee" size="sm" />
        <code>size="sm"</code>
      </div>
      <div>
        <BaseIcon name="coffee" size="lg" />
        <code>size="lg"</code>
      </div>
      <div>
        <BaseIcon name="coffee" size="2x" />
        <code>size="2x"</code>
      </div>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="book" type="fas" size="2x" />
    </template>
    <template #heading>Documentation</template>

    Vue's
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="screwdriver-wrench" type="fas" size="2x" />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://vitest.dev/" target="_blank" rel="noopener">Vitest</a>
    and
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>
    /
    <a href="https://playwright.dev/" target="_blank" rel="noopener">Playwright</a>.

    <br />

    More instructions are available in
    <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a
    >.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="cubes" type="fas" size="2x" />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="users" type="fas" size="2x" />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>
    (our official Discord server), or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also follow the official
    <a href="https://bsky.app/profile/vuejs.org" target="_blank" rel="noopener">@vuejs.org</a>
    Bluesky account or the
    <a href="https://x.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    X account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BaseIcon name="heart" type="fas" size="2x" />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>

<style scoped>
.demo-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.demo-section.sizes {
  flex-direction: column;
  align-items: flex-start;
}

.demo-section.sizes > div {
  display: flex;
  align-items: center;
  gap: 20px;
}

code {
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}
</style>
