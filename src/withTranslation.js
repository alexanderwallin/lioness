/* eslint react/jsx-props-no-spreading: 0 */
import React from 'react'

import useTranslation from './useTranslation.js'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

/**
 * Provides the given component with translator functions
 * as props.
 */
export default function withTranslation(WrappedComponent) {
  function ComponentWithTranslators(props) {
    const context = useTranslation()
    return <WrappedComponent {...context} {...props} />
  }
  ComponentWithTranslators.displayName = `withTranslation(${getDisplayName(
    WrappedComponent
  )})`
  return ComponentWithTranslators
}
