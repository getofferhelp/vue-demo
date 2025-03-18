import emojiData from '@emoji-mart/data'

// 添加调试日志
console.log('Emoji data:', emojiData)

// 确保数据格式正确
export const emojiIcons = Object.values(emojiData.emojis).map((emoji: any) => ({
  name: emoji.name,
  icon: emoji.skins[0].native,
  category: emoji.category,
  keywords: emoji.keywords,
}))

// 如果数据加载失败，提供一些默认的emoji
const defaultEmojis = [
  { name: 'smile', icon: '😊', category: 'smileys', keywords: ['happy', 'joy'] },
  { name: 'heart', icon: '❤️', category: 'symbols', keywords: ['love'] },
  { name: 'star', icon: '⭐', category: 'symbols', keywords: ['favorite'] },
  { name: 'sun', icon: '☀️', category: 'nature', keywords: ['weather'] },
  { name: 'moon', icon: '🌙', category: 'nature', keywords: ['night'] },
]

// 如果 emojiIcons 为空，使用默认数据
if (!emojiIcons.length) {
  console.warn('No emojis loaded from emoji-mart, using default emojis')
  emojiIcons.push(...defaultEmojis)
}

export const unicodeIcons = [
  { name: 'star', icon: '★' },
  { name: 'heart', icon: '♥' },
  { name: 'diamond', icon: '◆' },
  { name: 'circle', icon: '●' },
  { name: 'square', icon: '■' },
  { name: 'triangle', icon: '▲' },
  { name: 'arrow-right', icon: '→' },
  { name: 'check', icon: '✓' },
  // 可以继续添加更多...
]

// 可选：按分类获取 emoji
export const getEmojisByCategory = (category: string) => {
  return emojiIcons.filter((emoji) => emoji.category === category)
}

// 获取所有分类
export const emojiCategories = Array.from(new Set(emojiIcons.map((emoji) => emoji.category)))

console.log('Processed emoji icons:', emojiIcons)
console.log('Categories:', emojiCategories)
