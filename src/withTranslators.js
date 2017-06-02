import { getContext, wrapDisplayName } from 'recompose'

import * as contextTypes from './contextTypes.js'

/**
 * Provides the given component with translator functions
 * as props.
 */
export default function withTranslators(WrappedComponent) {
  const withTranslators = getContext(contextTypes)(WrappedComponent)
  withTranslators.displayName = wrapDisplayName(WrappedComponent, 'withTranslators')
  return withTranslators
}
