import emojiData from '@emoji-mart/data'
import unicodeEmojiJson from 'unicode-emoji-json'
import { blocks, categories, properties } from '@unicode/unicode-15.1.0'

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

// 创建 Unicode 字符数组
const createUnicodeRange = (start: number, end: number, category: string) => {
  const chars = []
  for (let i = start; i <= end; i++) {
    try {
      const char = String.fromCodePoint(i)
      chars.push({
        name: `U+${i.toString(16).toUpperCase().padStart(4, '0')}`,
        icon: char,
        category: category,
        codePoint: i,
      })
    } catch (e) {
      console.warn(`无法创建码点 ${i} 的字符`)
    }
  }
  return chars
}

// 定义主分类
export const mainCategories = ['unicode', 'emoji'] as const

// Unicode 官方分类（这些是常用的 Unicode 块）
export const unicodeBlockCategories = [
  'Basic Latin',
  'Mathematical Operators',
  'Geometric Shapes',
  'Arrows',
  'Box Drawing',
  'Currency Symbols',
  'General Punctuation',
  'Supplemental Symbols and Pictographs',
  // ... 可以根据需要添加更多
] as const

// Emoji 分类
export const emojiCategories = Array.from(
  new Set(Object.values(unicodeEmojiJson).map((data) => data.group)),
)

// 根据分类获取图标
export const getIconsByCategory = (
  mainCategory: (typeof mainCategories)[number],
  subCategory?: string,
) => {
  if (mainCategory === 'emoji') {
    return Object.entries(unicodeEmojiJson)
      .filter(([_, data]) => !subCategory || data.group === subCategory)
      .map(([char, data]) => ({
        name: data.name.toLowerCase(),
        icon: char,
        category: data.group,
      }))
  }

  return blocks
    .filter((block) => !subCategory || block.name === subCategory)
    .flatMap((block) => {
      const start = Number.parseInt(block.start, 16)
      const end = Number.parseInt(block.end, 16)
      return createUnicodeRange(start, end, block.name)
    })
}

console.log('Processed emoji icons:', emojiIcons)
console.log('Categories:', emojiCategories)
