// eslint-disable-next-line
import Gettext from 'node-gettext'

import type { Adapter, Locale, MessageSet } from '../types.js'

interface GettextOptions {
  debug?: boolean
  sourceLocale?: Locale
}

export default function createNodeGettextAdapter(
  options?: GettextOptions
): Adapter {
  const gt = new Gettext(options)

  return {
    /**
     * Add translations for each locale
     */
    setup: (messages: MessageSet, locale: Locale): void => {
      Object.keys(messages).forEach((lang) => {
        gt.addTranslations(lang, 'messages', messages[lang] as object)
      })

      gt.setLocale(locale)
    },

    /**
     * Set current locale
     */
    setLocale: (locale: Locale) => gt.setLocale(locale),

    /**
     * Get a translation
     */
    translate: ({ message, messagePlural = '', context = '', count = 1 }) => {
      return gt.npgettext(context, message, messagePlural, count)
    },
  }
}
