import type {
  Adapter,
  Locale,
  MessageSet,
  TranslateProps,
} from '../../src/types.js'

const adapter: Adapter = {
  setup: (messages: MessageSet, locale: Locale) => {},
  setLocale: () => {},
  translate: ({
    message,
    messagePlural,
    context,
    count,
  }: TranslateProps): string => message,
}

export default adapter
