import React, { type FC, type ReactNode, useCallback, useEffect } from 'react'

import Context from '../Context.js'
import interpolate from '../interpolate.js'
import type {
  Adapter,
  MessageSet,
  LionessContext,
  Locale,
  InterpolationScope,
  TransformFunc,
  TranslateFunc,
  TranslateProps,
} from '../types.js'

const inputIdentity = (x: string): any => x

/**
 * Localization context provider
 */
interface LionessProviderProps {
  adapter: Adapter
  messages: MessageSet
  locale: Locale
  transformInput?: TransformFunc
  children: ReactNode
  debug?: boolean
}

export default function LionessProvider({
  adapter,
  messages,
  locale,
  children,
  transformInput = inputIdentity,
  debug = false,
}: LionessProviderProps): ReactNode {
  adapter.setup(messages, locale)

  // Pass on new locales
  useEffect(() => {
    adapter.setLocale(locale)
  }, [locale])

  // Create translation+interpolation function
  const t = useCallback(
    (props: TranslateProps, scope: InterpolationScope) => {
      const transformedProps: TranslateProps = {
        ...props,
        message: transformInput(props.message),
      }
      if (props.messagePlural) {
        transformedProps.messagePlural = transformInput(props.messagePlural)
      }

      const translation: string = adapter.translate(transformedProps)
      const interpolatedTranslation: ReactNode = interpolate(translation, scope)
      return interpolatedTranslation
    },
    [adapter, locale, transformInput]
  )

  const context: LionessContext = {
    locale,
    messages,
    transformInput,
    t,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}
