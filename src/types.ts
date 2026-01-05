import type { ReactNode } from 'react'

/**
 * Utility types
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

/**
 * Library types
 */
export type Locale = string

export type TransformFunc = (input: string) => string

// Adapter
export interface AdapterTranslateParams {
  one: string
  other?: string | undefined
  context?: string | undefined
  count?: number | undefined
}

export type AdapterTranslateFunc = (props: AdapterTranslateParams) => string

export type Adapter = {
  setup: (messages: MessageSet, locale: Locale) => void
  setLocale: (locale: Locale) => void
  translate: AdapterTranslateFunc
}

// Interpolation
export type InterpolationScope = Record<string, ReactNode>

// Context
export type LionessContext = {
  locale: Locale
  messages: MessageSet
  transformInput: (input: string) => string
  t: (props: AdapterTranslateParams, scope: InterpolationScope) => ReactNode
}

// node-gettext types
export type Message = {
  msgid: string
  msgid_plural?: string
  msgstr: string[]
  comments?: {
    translator?: string
    reference?: string
  }
}

export type Translations = {
  charset: string
  headers: {
    language: string
    'plural-forms'?: string
  }
  translations: {
    [key: string]: {
      [key: string]: Message
    }
  }
}

export type MessageSet = Record<Locale, Translations>
