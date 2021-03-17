/* eslint react/jsx-props-no-spreading: 0 */
import React from 'react'

import useTranslators from './useTranslators.js'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

/**
 * Provides the given component with translator functions
 * as props.
 */
export default function withTranslators(WrappedComponent) {
  function ComponentWithTranslators(props) {
    const translators = useTranslators()
    return <WrappedComponent {...translators} {...props} />
  }
  ComponentWithTranslators.displayName = `withTranslators(${getDisplayName(
    WrappedComponent
  )})`
  return ComponentWithTranslators
}
