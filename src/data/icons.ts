import emojiData from '@emoji-mart/data'

// 先添加调试日志查看实际数据结构
console.log('Raw emoji data structure:', emojiData)

// 定义 emoji-mart 数据的类型
interface EmojiMartData {
  emojis: {
    [key: string]: EmojiRawData
  }
}

interface EmojiRawData {
  name: string
  skins: Array<{
    native: string
  }>
  keywords: string[]
  category: string
}

// 使用类型断言处理 emojiData
const typedEmojiData = emojiData as unknown as EmojiMartData

// 修改数据处理方式，添加类型断言
export const emojiIcons = Object.values(typedEmojiData.emojis || {}).map((emoji) => ({
  name: (emoji as EmojiRawData).name,
  icon: (emoji as EmojiRawData).skins[0].native,
  category: (emoji as EmojiRawData).category,
  keywords: (emoji as EmojiRawData).keywords || [],
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
