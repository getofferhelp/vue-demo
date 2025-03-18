declare module '@unicode/unicode-15.1.0' {
  interface UnicodeBlock {
    name: string
    start: string
    end: string
    type: string
  }

  interface UnicodeCategory {
    name: string
    description: string
  }

  interface UnicodeProperty {
    value: string | number
    description?: string
  }

  export const blocks: UnicodeBlock[]
  export const categories: UnicodeCategory[]
  export const properties: Record<string, UnicodeProperty>
}
