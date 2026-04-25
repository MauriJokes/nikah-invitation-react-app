import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import langs from '../i18n/translations'
import type { Lang, Translations } from '../i18n/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ms')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: langs[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useT(): Translations {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useT must be used inside LanguageProvider')
  return ctx.t
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return { lang: ctx.lang, setLang: ctx.setLang }
}
