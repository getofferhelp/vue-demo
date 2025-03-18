<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 图标名称
  name: string
  // 图标类型：solid, regular, brands
  type?: 'fas' | 'far' | 'fab'
  // 大小
  size?: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '4x' | '5x'
  // 是否旋转
  spin?: boolean
  // 是否脉冲旋转
  pulse?: boolean
  // 自定义类名
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'fas',
  size: 'lg',
  spin: false,
  pulse: false,
  className: '',
})

// 计算完整的图标名称
const iconName = computed(() => {
  // 如果name中已包含类型前缀，则直接使用
  if (props.name.includes('fa-')) {
    return props.name
  }
  // 否则组合类型和名称
  return [props.type, props.name]
})
</script>

<template>
  <font-awesome-icon :icon="iconName" :size="size" :spin="spin" :pulse="pulse" :class="className" />
</template>

<style scoped>
.icon {
  display: inline-block;
}
</style>
