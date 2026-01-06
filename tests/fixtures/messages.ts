import type { MessageSet } from '../../src/types.js'

const messages: MessageSet = {
  en: {
    charset: 'utf-8',
    headers: {
      language: 'en',
    },
    translations: {
      '': {
        'hi there': {
          msgid: 'hi there',
          msgstr: ['hi there'],
        },
      },
    },
  },
  'sv-SE': {
    charset: 'utf-8',
    headers: {
      language: 'sv-SE',
    },
    translations: {
      '': {
        'hi there': {
          msgid: 'hi there',
          msgstr: ['hallå där'],
        },
      },
    },
  },
}

export default messages
