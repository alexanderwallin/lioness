import { useContext } from 'react'

import Context from './Context.js'

export default function useTranslation() {
  const context = useContext(Context)
  return context
}
