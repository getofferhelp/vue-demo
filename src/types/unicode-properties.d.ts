declare module 'unicode-properties' {
  interface UnicodeProperty {
    gc: string
    name?: string
    category?: string
    combining?: number
    bidi?: string
    decomposition?: string
    numeric?: number
    decimal?: number
    digit?: number
    mirrored?: boolean
    sc?: string
    bc?: string
  }

  interface UnicodeProperties {
    getProperties(codePoint: number): UnicodeProperty
    isLetter(codePoint: number): boolean
    isLowercaseLetter(codePoint: number): boolean
    isUppercaseLetter(codePoint: number): boolean
    isTitlecaseLetter(codePoint: number): boolean
    isModifierLetter(codePoint: number): boolean
    isOtherLetter(codePoint: number): boolean
    isMark(codePoint: number): boolean
    isNumber(codePoint: number): boolean
    isPunctuation(codePoint: number): boolean
    isSymbol(codePoint: number): boolean
    isSeparator(codePoint: number): boolean
    isOther(codePoint: number): boolean
  }

  const properties: UnicodeProperties
  export default properties
}
