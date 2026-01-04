import { createContext } from 'react'

import { type LionessContext } from './types.js'

const Context = createContext<LionessContext | {}>({})

export default Context
