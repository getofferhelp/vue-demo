<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from './BaseIcon.vue'

const activeTab = ref('icons')

// 定义图标类型
type IconType = 'fas' | 'far' | 'fab'
type IconSize = 'xs' | 'sm' | 'lg' | '2x' | '3x' | '4x' | '5x'

interface IconDemo {
  name: string
  type: IconType
  size?: IconSize
}

const tabs = [
  {
    id: 'icons',
    name: 'Icons',
    description: '强大的矢量图标库，包含品牌图标、实底和轮廓样式等',
    demo: [
      { name: 'user', type: 'fas' as IconType },
      { name: 'heart', type: 'far' as IconType },
      { name: 'github', type: 'fab' as IconType },
      { name: 'star', type: 'far' as IconType },
      { name: 'code', type: 'fas' as IconType },
      { name: 'twitter', type: 'fab' as IconType },
    ] as IconDemo[],
  },
  {
    id: 'unicode',
    name: 'Unicode ',
    description: '包含基础拉丁字符、数学符号、几何图形等 Unicode 字符',
    symbols: ['←', '→', '△', '▽', '♠', '♥', '♦', '♣', '✓', '✗', '☀', '☂'],
  },
  {
    id: 'unicode-emoji',
    name: 'Emoji',
    description: '完整的 Unicode 表情符号集合，包含表情、人物、自然等分类',
    emojis: ['😊', '👋', '🌟', '🎉', '🎨', '🚀', '🌈', '🎸', '🌺', '🍕', '🎮', '📱'],
  },
]
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="{ active: activeTab === tab.id }"
      @click="activeTab = tab.id"
    >
      {{ tab.name }}
    </button>
  </div>

  <div class="tab-content">
    <div v-if="activeTab === 'icons'" class="content-section">
      <h2>{{ tabs[0].name }}</h2>
      <p>{{ tabs[0].description }}</p>
      <div class="demo-icons">
        <BaseIcon
          v-for="icon in tabs[0].demo"
          :key="icon.name"
          :name="icon.name"
          :type="icon.type"
          size="lg"
        />
      </div>
      <router-link to="/icons" class="view-more">查看更多图标 →</router-link>
    </div>

    <div v-if="activeTab === 'unicode'" class="content-section">
      <h2>{{ tabs[1].name }}</h2>
      <p>{{ tabs[1].description }}</p>
      <div class="demo-symbols">
        <span v-for="symbol in tabs[1].symbols" :key="symbol">{{ symbol }}</span>
      </div>
      <router-link to="/unicode" class="view-more">浏览所有字符 →</router-link>
    </div>

    <div v-if="activeTab === 'unicode-emoji'" class="content-section">
      <h2>{{ tabs[2].name }}</h2>
      <p>{{ tabs[2].description }}</p>
      <div class="demo-emojis">
        <span v-for="emoji in tabs[2].emojis" :key="emoji">{{ emoji }}</span>
      </div>
      <router-link to="/unicode-emoji" class="view-more">查看所有表情 →</router-link>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 10px;
}

.tabs button {
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  cursor: pointer;
  font-size: 16px;
  color: var(--color-text);
  border-radius: 4px;
}

.tabs button.active {
  background: var(--color-text);
  color: var(--color-background);
  border-color: var(--color-text);
}

.content-section {
  padding: 20px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 20px;
}

.content-section h2 {
  margin-bottom: 10px;
  color: var(--color-text);
}

.content-section p {
  color: var(--color-text);
  opacity: 0.8;
}

.demo-icons,
.demo-symbols,
.demo-emojis {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  padding: 15px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 24px;
  color: var(--color-text);
}

.demo-symbols span,
.demo-emojis span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
}

.demo-symbols span:hover,
.demo-emojis span:hover {
  transform: scale(1.1);
  background: var(--color-background-soft);
}

.view-more {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 12px;
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
}

.view-more:hover {
  background: var(--color-primary);
  color: white;
  text-decoration: none;
}

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
  background: var(--color-background-mute);
  color: var(--color-text);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}
</style>
