import Gettext from 'node-gettext'

export default function GettextAdapter(messages, locale, options) {
  const gt = new Gettext(options)
  Object.keys(messages).forEach((lang) => {
    gt.addTranslations(lang, 'messages', messages[lang])
  })
  gt.setLocale(locale)

  return {
    setLocale: (newLocale) => gt.setLocale(newLocale),
    translate: ({ context, message, messagePlural, count }) => {
      return gt.npgettext(context, message, messagePlural, count)
    },
  }
}
