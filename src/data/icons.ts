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

// 定义 Unicode 相关的类型
interface UnicodeBlock {
  name: string
  start: number
  end: number
}

interface UnicodeIcon {
  name: string
  icon: string
  category: string
  codePoint: number
}

// Unicode 字符块定义
export const unicodeBlocks: UnicodeBlock[] = [
  {
    name: 'Basic Latin (Printable)',
    start: 0x0020,
    end: 0x007f,
  },
  {
    name: 'Latin-1 Supplement',
    start: 0x00a0,
    end: 0x00ff,
  },
  {
    name: 'Currency Symbols',
    start: 0x20a0,
    end: 0x20cf,
  },
  {
    name: 'Arrows',
    start: 0x2190,
    end: 0x21ff,
  },
  {
    name: 'Mathematical Operators',
    start: 0x2200,
    end: 0x22ff,
  },
  {
    name: 'Box Drawing',
    start: 0x2500,
    end: 0x257f,
  },
  {
    name: 'Geometric Shapes',
    start: 0x25a0,
    end: 0x25ff,
  },
  {
    name: 'Miscellaneous Symbols',
    start: 0x2600,
    end: 0x26ff,
  },
]

const createUnicodeRange = (start: number, end: number, category: string): UnicodeIcon[] => {
  const chars: UnicodeIcon[] = []
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

// 获取指定 Unicode 块的字符
export const getUnicodeIcons = (blockName?: string): UnicodeIcon[] => {
  const block = blockName ? unicodeBlocks.find((b) => b.name === blockName) : unicodeBlocks[0]
  if (!block) return []
  return createUnicodeRange(block.start, block.end, block.name)
}

// Unicode 分类列表
export const unicodeCategories: string[] = unicodeBlocks.map((block) => block.name)

// 获取分类中的字符数量
export const getUnicodeCategoryCount = (category: string): number => {
  const block = unicodeBlocks.find((b) => b.name === category)
  if (!block) return 0
  return block.end - block.start + 1
}

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
