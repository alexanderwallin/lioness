import React, { type FC, type ReactNode, useCallback, useEffect } from 'react'

import Context from '../Context.js'
import { interpolate } from '../interpolate.js'
import type {
  Adapter,
  AdapterTranslateParams,
  MessageSet,
  LionessContext,
  Locale,
  InterpolationScope,
  TransformFunc,
} from '../types.js'

const inputIdentity = (x: string): string => x

/**
 * Localization context provider
 */
interface LionessProviderProps {
  adapter: Adapter
  messages: MessageSet
  locale: Locale
  children: ReactNode
  transformInput?: TransformFunc
  debug?: boolean
}

export function LionessProvider({
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
  }, [adapter, locale])

  // Create a simple translation function
  const t = useCallback(
    (message: string): string => {
      return adapter.translate({
        one: transformInput(message),
      })
    },
    [adapter, transformInput]
  )

  // Create translation+interpolation function
  const ti = useCallback(
    (params: AdapterTranslateParams, scope: InterpolationScope) => {
      const transformedParams: AdapterTranslateParams = {
        ...params,
        one: transformInput(params.one),
      }
      if (params.other) {
        transformedParams.other = transformInput(params.other)
      }

      const translation: string = adapter.translate(transformedParams)
      const interpolatedTranslation: ReactNode = interpolate(translation, scope)
      return interpolatedTranslation
    },
    [adapter, transformInput]
  )

  const context: LionessContext = {
    locale,
    t,
    ti,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}
