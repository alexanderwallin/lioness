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
  message?: string
  children?: string
  messagePlural?: string
  context?: string
  count?: number
  [key: string]: any
}

type TProps = RequireOnlyOne<TPropsBase, 'message' | 'children'>

export default function T({
  message,
  children,
  messagePlural,
  context,
  count,
  ...scope
}: TProps): ReactNode {
  const { t } = useTranslation()

  const msgid = message || children || ''
  const payload: TranslateProps = {
    context,
    message: msgid,
    messagePlural,
    count,
  }
  const scopeWithCount = { ...scope, count }

  const translatedContent = t(payload, scopeWithCount)
  return <>{translatedContent}</>
}
