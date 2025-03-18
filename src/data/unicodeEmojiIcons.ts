import unicodeEmojiJson from 'unicode-emoji-json'

// 定义 Unicode Emoji 的类型
interface UnicodeEmoji {
  id: string
  name: string
  icon: string
  category: string
  keywords: string[]
}

// 处理 Unicode Emoji 数据
export const unicodeEmojiIcons: UnicodeEmoji[] = Object.entries(unicodeEmojiJson).map(
  ([char, data]) => ({
    id: data.name,
    name: data.name,
    icon: char,
    category: data.group,
    keywords: [data.slug],
  }),
)

// 添加调试日志
console.log('Sample Unicode Emoji data:', unicodeEmojiIcons.slice(0, 5))
console.log('Total Unicode Emojis:', unicodeEmojiIcons.length)

// 获取所有 Unicode Emoji 分类
export const unicodeEmojiCategories = Array.from(
  new Set(unicodeEmojiIcons.map((emoji) => emoji.category)),
).sort()

// 打印分类信息
console.log('Unicode Emoji Categories:', unicodeEmojiCategories)

// 按分类获取 emoji
export const getUnicodeEmojisByCategory = (category?: string) => {
  if (!category) return unicodeEmojiIcons
  return unicodeEmojiIcons.filter((emoji) => emoji.category === category)
}
