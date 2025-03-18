import emojiData from '@emoji-mart/data'
import unicodeEmojiJson from 'unicode-emoji-json'

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
  {
    name: 'smile',
    icon: '😊',
    category: 'smileys',
    keywords: ['happy', 'joy'],
  },
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

// 扩展 unicodeIcons
export const unicodeIcons = [
  // 基础符号
  { name: 'bullet', icon: '•', category: 'basic' },
  { name: 'middot', icon: '·', category: 'basic' },
  { name: 'star', icon: '★', category: 'basic' },
  { name: 'star-outline', icon: '☆', category: 'basic' },
  { name: 'heart', icon: '♥', category: 'basic' },
  { name: 'heart-outline', icon: '♡', category: 'basic' },

  // 几何图形
  { name: 'square', icon: '■', category: 'geometric' },
  { name: 'square-outline', icon: '□', category: 'geometric' },
  { name: 'circle', icon: '●', category: 'geometric' },
  { name: 'circle-outline', icon: '○', category: 'geometric' },
  { name: 'triangle', icon: '▲', category: 'geometric' },
  { name: 'triangle-outline', icon: '△', category: 'geometric' },
  { name: 'diamond', icon: '◆', category: 'geometric' },
  { name: 'diamond-outline', icon: '◇', category: 'geometric' },

  // 箭头
  { name: 'arrow-left', icon: '←', category: 'arrows' },
  { name: 'arrow-right', icon: '→', category: 'arrows' },
  { name: 'arrow-up', icon: '↑', category: 'arrows' },
  { name: 'arrow-down', icon: '↓', category: 'arrows' },
  { name: 'arrow-double-left', icon: '⇐', category: 'arrows' },
  { name: 'arrow-double-right', icon: '⇒', category: 'arrows' },
  { name: 'arrow-double-up', icon: '⇑', category: 'arrows' },
  { name: 'arrow-double-down', icon: '⇓', category: 'arrows' },

  // 数学符号
  { name: 'plus', icon: '＋', category: 'math' },
  { name: 'minus', icon: '－', category: 'math' },
  { name: 'multiply', icon: '×', category: 'math' },
  { name: 'divide', icon: '÷', category: 'math' },
  { name: 'equal', icon: '＝', category: 'math' },
  { name: 'not-equal', icon: '≠', category: 'math' },
  { name: 'infinity', icon: '∞', category: 'math' },
  { name: 'plus-minus', icon: '±', category: 'math' },

  // 标点符号
  { name: 'check', icon: '✓', category: 'marks' },
  { name: 'cross', icon: '✗', category: 'marks' },
  { name: 'copyright', icon: '©', category: 'marks' },
  { name: 'registered', icon: '®', category: 'marks' },
  { name: 'trademark', icon: '™', category: 'marks' },
  { name: 'degree', icon: '°', category: 'marks' },

  // 货币符号
  { name: 'yuan', icon: '¥', category: 'currency' },
  { name: 'dollar', icon: '$', category: 'currency' },
  { name: 'euro', icon: '€', category: 'currency' },
  { name: 'pound', icon: '£', category: 'currency' },

  // 音乐符号
  { name: 'music-note', icon: '♪', category: 'music' },
  { name: 'music-notes', icon: '♫', category: 'music' },
  { name: 'music-eighth', icon: '♩', category: 'music' },
  { name: 'music-beamed', icon: '♬', category: 'music' },

  ...Object.entries(unicodeEmojiJson).map(([char, data]) => ({
    name: data.name.toLowerCase(),
    icon: char,
    category: data.group,
    keywords: [data.subgroup],
  })),

  // 原有的 Unicode 符号
  // ... existing code ...
]

// 更新分类获取逻辑
export const unicodeCategories = Array.from(
  new Set([
    'basic',
    'geometric',
    'arrows',
    'math',
    'marks',
    'currency',
    'music',
    ...Object.values(unicodeEmojiJson).map((data) => data.group),
  ]),
)

// 可选：按分类获取 emoji
export const getEmojisByCategory = (category: string) => {
  return emojiIcons.filter((emoji) => emoji.category === category)
}

// 获取所有分类
export const emojiCategories = Array.from(new Set(emojiIcons.map((emoji) => emoji.category)))

console.log('Processed emoji icons:', emojiIcons)
console.log('Categories:', emojiCategories)
