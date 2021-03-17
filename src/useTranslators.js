import { useContext } from 'react'

import Context from './Context.js'

function useTranslators() {
  const context = useContext(Context)
  return context
}

export default useTranslators
