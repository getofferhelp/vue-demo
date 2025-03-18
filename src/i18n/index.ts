import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'
import es from '../locales/es'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    es,
  },
})

export default i18n
