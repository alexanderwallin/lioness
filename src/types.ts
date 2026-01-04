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

/**
 * Library types
 */
export type Locale = string

export type TransformFunc = (input: string) => string

export interface TranslateProps {
  message: string
  messagePlural?: string | undefined
  context?: string | undefined
  count?: number | undefined
}

export type TranslateFunc = (props: TranslateProps) => string

export type Adapter = {
  setup: (messages: MessageSet, locale: Locale) => void
  setLocale: (locale: Locale) => void
  translate: TranslateFunc
}

export type InterpolationScope = Record<string, ReactNode>

export type LionessContext = {
  locale: Locale
  messages: MessageSet
  transformInput: (input: string) => string
  t: (props: TranslateProps, scope: InterpolationScope) => ReactNode
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
