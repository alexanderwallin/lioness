import React, {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from 'react'

/*

<div>
  {t('Check the {{ author }} for more articles', {
    author: <Link to={`/authors/${author.id}`}>{author.name}</Link>
  })}
</div>

*/

type ReplacementFunction = (children: string) => ReactNode
type ScopeKeyValuePair = [string, string] | null

// Note that [^] is used rather than . to match any character. This
// is because . doesn't span over multiple lines, whereas [^] does.
const variableRegex = /(\{\{\s[^]+?(?=\s\}\})\s\}\})/g

/**
 * Returns whether a string is a template variable.
 *
 * @param  {String}    str  A string
 * @return {Boolean}        True if the string is a template variable,
 *                          false if not
 */
export function isTemplateVariable(str: string) {
  return new RegExp(variableRegex).test(str)
}

function getScopeKeyValuePair(keyValue: string): ScopeKeyValuePair {
  const [scopeKey, scopeChildren]: string[] = keyValue.split(/:([^]+)/)

  if (scopeKey && scopeChildren) {
    return [scopeKey, scopeChildren]
  }

  return null
}

/**
 * Interpolates a string, with support for injecting React components.
 *
 * @param  {String}    str    A string to be interpolated
 * @param  {Object}    scope  An object with variable names and their
 *                            replacements
 * @return {String|Component} A string or React component
 */
export default function interpolate(
  str: string,
  scope: Record<string, ReactNode> = {}
): ReactNode {
  if (!str) {
    return str
  }

  // Split string into array with regular text and variables split
  // into separate segments, like ['This is a ', '{{ thing }}', '!']
  const parts: string[] = str.split(new RegExp(variableRegex)).filter((x) => x)

  // If the only thing we have is a single regular string, just return it as is
  if (
    parts.length === 1 &&
    parts[0] !== undefined &&
    isTemplateVariable(parts[0]) === false
  ) {
    return str
  }

  const interpolatedParts: ReactNode[] = parts.map((part, i) => {
    const key = `${part}_${i}`

    // Not a template variable, return as is
    if (isTemplateVariable(part) === false) {
      return part
    }

    const keyName: string = part.replace(/^\{\{\s/, '').replace(/\s\}\}$/, '')
    const keyValuePair: ScopeKeyValuePair = getScopeKeyValuePair(keyName)

    if (keyValuePair === null) {
      return part
    }

    const [scopeKey, scopeChildren] = keyValuePair

    // No matching scope replacement, return raw string
    if (scope[scopeKey] === undefined) {
      return part
    }

    const replacement = scope[scopeKey]

    // Let the caller create the result
    if (typeof replacement === 'function') {
      return (replacement as ReplacementFunction)(scopeChildren)
    }

    // If the interpolated scope variable is not a React element, render
    // it as a string
    if (isValidElement(replacement) === false) {
      return String(replacement)
    }

    // Returns a clone of the to-be injected element, passing child content
    // from the scope if it exists
    return scopeChildren === undefined
      ? cloneElement(replacement, { key })
      : cloneElement(replacement, { key }, scopeChildren)
  })

  if (interpolatedParts.every((part) => isValidElement(part) === false)) {
    return interpolatedParts.join('')
  }
  return <>{Children.toArray(interpolatedParts)}</>
}
