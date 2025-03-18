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

// 定义 Unicode 块的基本范围，调整起始位置避开控制字符
const unicodeBlocks = [
  {
    name: 'Basic Latin (Printable)',
    start: 0x0020, // 从空格开始，避开控制字符
    end: 0x007f,
  },
  {
    name: 'Latin-1 Supplement',
    start: 0x00a0, // 从非断行空格开始
    end: 0x00ff,
  },
  {
    name: 'Mathematical Operators',
    start: 0x2200,
    end: 0x22ff,
  },
  {
    name: 'Geometric Shapes',
    start: 0x25a0,
    end: 0x25ff,
  },
  {
    name: 'Arrows',
    start: 0x2190,
    end: 0x21ff,
  },
  {
    name: 'Box Drawing',
    start: 0x2500,
    end: 0x257f,
  },
  {
    name: 'Currency Symbols',
    start: 0x20a0,
    end: 0x20cf,
  },
  {
    name: 'General Punctuation',
    start: 0x2000,
    end: 0x206f,
  },
  {
    name: 'CJK Symbols and Punctuation',
    start: 0x3000,
    end: 0x303f,
  },
  {
    name: 'Hiragana',
    start: 0x3040,
    end: 0x309f,
  },
  {
    name: 'Katakana',
    start: 0x30a0,
    end: 0x30ff,
  },
]

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

// 创建 Unicode 字符数组，添加调试信息
const createUnicodeRange = (start: number, end: number, category: string) => {
  console.log('Creating Unicode range:', start, end, category)
  const chars = []
  for (let i = start; i <= end; i++) {
    try {
      const char = String.fromCodePoint(i)

      // 简化字符检查逻辑，先不使用 unicodeProperties
      // 检查是否是可打印字符
      if (
        (i >= 0x20 && i <= 0x7e) || // 基本拉丁字母表中的可打印字符
        (i >= 0xa0 && i <= 0xff) || // Latin-1 补充中的可打印字符
        i >= 0x2000 // 其他 Unicode 块
      ) {
        chars.push({
          name: `U+${i.toString(16).toUpperCase().padStart(4, '0')}`,
          icon: char,
          category: category,
          codePoint: i,
        })
      }
    } catch (e) {
      console.warn(`Error creating character at ${i}:`, e)
    }
  }
  console.log(`Created ${chars.length} characters for ${category}`)
  return chars
}

// 确保 unicodeBlocks 不为空
console.log('Available Unicode blocks:', unicodeBlocks)
console.log('Unicode categories:', unicodeBlockCategories)

// Emoji 分类
export const emojiCategories = Array.from(
  new Set(Object.values(unicodeEmojiJson).map((data) => data.group)),
)

console.log('Processed emoji icons:', emojiIcons)
console.log('Categories:', emojiCategories)
