import Gettext from 'node-gettext'

// Returns an instance of node-gettext, populate with the
// given messages and set to use the given locale.
export default function getGettextInstance(messages, locale) {
  const gt = new Gettext()

  Object.keys(messages).forEach(lang => {
    gt.addTranslations(lang, 'messages', messages[lang])
  })

  gt.setLocale(locale)

  return gt
}
