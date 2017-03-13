import { getContext } from 'recompose'

import * as contextTypes from './contextTypes'

/**
 * Provides the given component with translator functions
 * as props.
 */
export const withTranslators = Component =>
  getContext(contextTypes)(Component)
