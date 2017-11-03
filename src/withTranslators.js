import { getContext, wrapDisplayName } from 'recompose'

import * as contextTypes from './contextTypes.js'
import forceUpdatedComponent from './forceUpdatedComponent.js'

/**
 * Provides the given component with translator functions
 * as props.
 */
export default function withTranslators(WrappedComponent) {
  const forceUpdatedWrappedComponent = forceUpdatedComponent(WrappedComponent)
  const withTranslators = getContext(contextTypes)(forceUpdatedWrappedComponent)
  withTranslators.displayName = wrapDisplayName(WrappedComponent, 'withTranslators')
  return withTranslators
}
