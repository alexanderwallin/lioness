/* eslint react/jsx-props-no-spreading: 0 */
import React, { useContext } from 'react'

import Context from './Context.js'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

/**
 * Provides the given component with translator functions
 * as props.
 */
export default function withTranslators(WrappedComponent) {
  function ComponentWithTranslators(props) {
    const context = useContext(Context)
    return <WrappedComponent {...context} {...props} />
  }
  ComponentWithTranslators.displayName = `withTranslators(${getDisplayName(
    WrappedComponent
  )})`
  return ComponentWithTranslators
}
