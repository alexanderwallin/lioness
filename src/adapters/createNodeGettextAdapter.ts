// eslint-disable-next-line
import Gettext from 'node-gettext'

import type { Adapter, Locale, MessageSet } from '../types.js'

interface GettextOptions {
  debug?: boolean
  sourceLocale?: Locale
}

/**
 * Creates an adapter for node-gettext.
 *
 * @param  {GettextOptions} options  node-gettext options
 * @return {Adapter}                 An adapter
 */
export function createNodeGettextAdapter(options?: GettextOptions): Adapter {
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
    translate: ({ one, other = '', context = '', count = 1 }) =>
      gt.npgettext(context, one, other, count),
  }
}
