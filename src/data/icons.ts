import emojiData from '@emoji-mart/data'
import unicodeEmojiJson from 'unicode-emoji-json'
import unicodeProperties from 'unicode-properties'

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

// 添加调试函数
const debugEmojiData = () => {
  // 检查原始数据
  console.log('Raw emoji-mart data:', emojiData)

  // 检查处理后的数据
  const sampleEmojis = emojiIcons.slice(0, 5)
  console.log('Sample processed emojis:', sampleEmojis)

  // 统计每个分类的数量
  const categoryCounts = emojiIcons.reduce(
    (acc, emoji) => {
      acc[emoji.category] = (acc[emoji.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  console.log('Emoji counts by category:', categoryCounts)
}

// 修改默认的 emoji 数据结构，添加 id 字段
const defaultEmojis = [
  {
    id: 'smile',
    name: 'smile',
    icon: '😊',
    category: 'Smileys & Emotion',
    keywords: ['happy', 'joy'],
  },
  {
    id: 'heart',
    name: 'heart',
    icon: '❤️',
    category: 'Symbols',
    keywords: ['love'],
  },
  {
    id: 'star',
    name: 'star',
    icon: '⭐',
    category: 'Symbols',
    keywords: ['favorite'],
  },
  {
    id: 'sun',
    name: 'sun',
    icon: '☀️',
    category: 'Animals & Nature',
    keywords: ['weather'],
  },
  {
    id: 'moon',
    name: 'moon',
    icon: '🌙',
    category: 'Animals & Nature',
    keywords: ['night'],
  },
]

// 定义统一的 Emoji 类型
interface EmojiIcon {
  id: string
  name: string
  icon: string
  category: string
  keywords: string[]
}

// 使用类型声明
export const emojiIcons: EmojiIcon[] = (() => {
  const rawData = emojiData as any

  // 打印所有独特的分类名称
  const uniqueCategories = new Set()

  const processedEmojis = Object.entries(rawData.emojis || {}).map(
    ([key, emoji]: [string, any]) => {
      // 记录每个 emoji 的分类
      uniqueCategories.add(emoji.category)

      return {
        id: key,
        name: emoji.name,
        icon: emoji.skins[0].native,
        category: emoji.category,
        keywords: emoji.keywords || [],
      }
    },
  )

  console.log('Actual categories in data:', Array.from(uniqueCategories))

  // 取样打印几个 emoji 的完整数据
  console.log('Sample emoji data:', processedEmojis.slice(0, 5))

  // 统计每个分类的数量
  const categoryCount = processedEmojis.reduce(
    (acc, emoji) => {
      acc[emoji.category] = (acc[emoji.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  console.log('Emoji count by category:', categoryCount)

  if (!processedEmojis.length) {
    console.warn('No emojis loaded from emoji-mart, using default emojis')
    return defaultEmojis
  }

  return processedEmojis
})()

// 只保留 Unicode 相关的代码
export const unicodeBlocks = [
  {
    name: 'Basic Latin (Printable)',
    start: 0x0020,
    end: 0x007f,
  },
  // ... 其他 Unicode 块 ...
]

interface UnicodeIcon {
  name: string
  icon: string
  category: string
  codePoint: number
}

export const getUnicodeIcons = (blockName?: string) => {
  const block = blockName ? unicodeBlocks.find((b) => b.name === blockName) : unicodeBlocks[0]

  if (!block) return []

  return createUnicodeRange(block.start, block.end, block.name)
}

const createUnicodeRange = (start: number, end: number, category: string): UnicodeIcon[] => {
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
      console.warn(`Error creating character at ${i}:`, e)
    }
  }
  return chars
}

export const unicodeCategories = unicodeBlocks.map((block) => block.name)

// 定义主分类
export const mainCategories = ['unicode', 'emoji'] as const

// Unicode 分类
export const unicodeBlockCategories = unicodeBlocks.map((block) => block.name)

// 添加 export 关键字
export const getIconsByCategory = (
  mainCategory: (typeof mainCategories)[number],
  subCategory?: string,
) => {
  console.log('Getting icons for:', mainCategory, subCategory)

  if (mainCategory === 'emoji') {
    return Object.entries(unicodeEmojiJson)
      .filter(([_, data]) => !subCategory || data.group === subCategory)
      .map(([char, data]) => ({
        name: data.name.toLowerCase(),
        icon: char,
        category: data.group,
      }))
  }

  const block = unicodeBlocks.find((b) => !subCategory || b.name === subCategory)
  console.log('Found Unicode block:', block)

  if (!block) {
    console.warn('No Unicode block found for category:', subCategory)
    return []
  }

  const chars = createUnicodeRange(block.start, block.end, block.name)
  console.log('Generated Unicode chars:', chars.length)

  return chars
}

// Emoji 分类
export const emojiCategories = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Travel & Places',
  'Activities',
  'Objects',
  'Symbols',
  'Flags',
].filter((category) => {
  const hasEmojis = emojiIcons.some((emoji) => emoji.category === category)
  if (!hasEmojis) {
    console.warn(`No emojis found for category: ${category}`)
  }
  return hasEmojis
})

console.log('Processed emoji icons:', emojiIcons)
console.log('Categories:', emojiCategories)

// 在组件中使用的过滤函数
export const getEmojisByCategory = (category: string) => {
  const emojis = emojiIcons.filter((emoji) => emoji.category === category)
  console.log(`Found ${emojis.length} emojis for category "${category}"`)
  console.log('Sample emojis:', emojis.slice(0, 3))
  return emojis
}
