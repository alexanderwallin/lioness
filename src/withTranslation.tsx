/* eslint react/jsx-props-no-spreading: 0 */
import React, { type ComponentType, type ElementType } from 'react'

import { type LionessContext } from './types.js'
import useTranslation from './useTranslation.js'

// function getDisplayName(Component: ElementType | ComponentType): string {
//   if (Component.hasOwnProperty('displayName')) {
//     return Component.displayName
//   }
//   return String(Component)
// }

/**
 * Provides the given component with Lioness context as props.
 */
export default function withTranslation(
  WrappedComponent: ElementType
): ElementType {
  const ComponentWithTranslators: ComponentType = (props) => {
    const context: LionessContext = useTranslation()
    return <WrappedComponent {...context} {...props} />
  }

  // ComponentWithTranslators.displayName = `withTranslation(${getDisplayName(
  //   WrappedComponent
  // )})`

  return ComponentWithTranslators
}
