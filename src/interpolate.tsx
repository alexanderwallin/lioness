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

type ReplacementFunction = (children: string | null | undefined) => ReactNode
type ScopeKeyValuePair = [string, string | null]

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

/**
 * Returns a "key:value" as a [key, value] tuple.
 *
 * @param  {String} keyValue  A "key:value" string
 * @return {Array}            A [key, value] tuple
 */
function getScopeKeyValuePair(keyValue: string): ScopeKeyValuePair {
  const parts: string[] = keyValue.split(/:([^]+)/)
  return parts.length > 1
    ? [parts[0] as string, parts[1] as string]
    : [parts[0] as string, null]
}

/**
 * Interpolates a string, with support for injecting React components.
 *
 * @param  {String}    str    A string to be interpolated
 * @param  {Object}    scope  An object with variable names and their
 *                            replacements
 * @return {String|Component} A string or React component
 */
export function interpolate(
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
    // Not a template variable, return as is
    if (isTemplateVariable(part) === false) {
      return part
    }

    const partContents: string = part
      .replace(/^\{\{\s/, '')
      .replace(/\s\}\}$/, '')
    const [key, value]: ScopeKeyValuePair = getScopeKeyValuePair(partContents)
    const replacement = scope[key]

    // No matching scope replacement, return raw string
    if (replacement === undefined) {
      return part
    }

    // Let the caller create the result
    if (typeof replacement === 'function') {
      return (replacement as ReplacementFunction)(value)
    }

    // If the interpolated scope variable is not a React element, render
    // it as a string
    if (isValidElement(replacement) === false) {
      return String(replacement)
    }

    // Returns a clone of the to-be injected element, passing child content
    // from the scope if it exists
    const reactKey = `${part}_${i}`
    return value === null
      ? cloneElement(replacement, { key: reactKey })
      : cloneElement(replacement, { key: reactKey }, value)
  })

  if (interpolatedParts.every((part) => isValidElement(part) === false)) {
    return interpolatedParts.join('')
  }

  if (interpolatedParts.length === 1) {
    return interpolatedParts[0]
  }

  return <>{Children.toArray(interpolatedParts)}</>
}
