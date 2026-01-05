import React, { type FC, type ReactNode } from 'react'

import type {
  LionessContext,
  RequireOnlyOne,
  TransformFunc,
  TranslateProps,
} from '../types.js'
import useTranslation from '../useTranslation.js'
import withTranslation from '../withTranslation.js'

interface TPropsBase {
  one?: string
  children?: string
  other?: string
  context?: string
  count?: number
  [key: string]: any
}

type TProps = RequireOnlyOne<TPropsBase, 'one' | 'children'>

export default function T({
  one,
  children,
  other,
  context,
  count,
  ...scope
}: TProps): ReactNode {
  const { t } = useTranslation()

  const msgid = one || children || ''
  const payload: TranslateProps = {
    context,
    one: msgid,
    other,
    count,
  }
  const scopeWithCount = { ...scope, count }

  const translatedContent = t(payload, scopeWithCount)
  return <>{translatedContent}</>
}
