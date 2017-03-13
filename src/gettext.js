import Gettext from 'node-gettext'

// Returns an instance of node-gettext, populate with the
// given messages and set to use the given locale.
export const getGettextInstance = (messages, locale) => {
  const gt = new Gettext()

  for (const lang in messages) {
    gt.addTranslations(lang, 'messages', messages[lang])
  }

  gt.setLocale(locale)

  return gt
}
