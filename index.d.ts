// Type definitions for lioness 0.2.13
// Project: https://github.com/alexanderwallin/lioness
// Definitions by: Alex Goooseman <https://github.com/goooseman>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.2

declare module 'lioness' {
  import * as React from 'react'

  type TransformInput = (input: string) => string

  export interface WithTranslators {
    locale: string
    t(message: string, scope?: Object): string
    tn(message: string, other: string, count: number, scope?: Object): string
    tp(context: string, message: string, scope?: Object): string
    tnp(
      context: string,
      one: string,
      other: string,
      count: number,
      scope?: Object
    ): string
    tc(message: string, scope?: Object): string
    tcn(message: string, other: string, count: number, scope?: Object): string
    tcp(context: string, message: string, scope?: Object): string
    tcnp(
      context: string,
      one: string,
      other: string,
      count: number,
      scope?: Object
    ): string
  }

  namespace T {
    export interface Props {
      message: string
      messagePlural?: string
      context?: string
      count?: number
      tcnp?: WithTranslators['tcnp']
      transformInput?: TransformInput
    }
  }
  class T extends React.Component<T.Props> {}

  namespace LionessProvider {
    export interface Props {
      messages: {
        [locale: string]: {
          headers: Object
          charset: string
          translations: {
            [key: string]: {
              [key: string]: {
                msgid: string
                msgid_plural?: string
                msgctxt?: string
                msgstr?: string[]
                comments?: {
                  reference: string
                }
              }
            }
          }
        }
      }
      locale: string
      children: React.ReactNode
      debug?: boolean
      transformInput?: TransformInput
    }
  }
  class LionessProvider extends React.Component<LionessProvider.Props> {}
}
