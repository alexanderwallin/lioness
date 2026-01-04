import { useContext } from 'react'

import Context from './Context.js'
import { type LionessContext } from './types.js'

export default function useTranslation(): LionessContext {
  const context = useContext(Context) as LionessContext
  return context
}
