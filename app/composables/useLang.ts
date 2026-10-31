import { copy, type Lang } from '~/data/i18n'

// English by default. The choice is kept in a cookie so the server renders
// the same language on the next visit (no flash of the other language).
export function useLang() {
  const lang = useCookie<Lang>('lang', {
    default: () => 'en',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })
  if (lang.value !== 'en' && lang.value !== 'th') lang.value = 'en'
  const t = computed(() => copy[lang.value])
  const setLang = (value: Lang) => {
    lang.value = value
  }
  return { lang, t, setLang }
}
