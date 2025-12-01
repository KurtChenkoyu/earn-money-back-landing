'use client'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { routing } from '@/i18n/routing'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const t = useTranslations('language')
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex gap-2">
        {routing.locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLocale(locale)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentLocale === locale
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {locale === 'zh-TW' ? '繁體中文' : 'English'}
          </button>
        ))}
      </div>
    </div>
  )
}

