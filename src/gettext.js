import Gettext from 'node-gettext';

// Returns an instance of node-gettext, populate with the
// given messages and set to use the given locale.
export const getGettextInstance = (messages, locale) => {
  const gt = new Gettext();

  for (const lang in messages) {
    gt.addTextdomain(lang, messages[lang]);
  }

  gt.textdomain(locale);

  return gt;
};
