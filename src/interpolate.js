import React from 'react'

/*

<div>
  {t('Check the {{ author }} for more articles', {
    author: <Link to={`/authors/${author.id}`}>{author.name}</Link>
  })}
</div>

*/

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
function isTemplateVariable(str) {
  return new RegExp(variableRegex).test(str)
}

/**
 * Interpolates a string, with support for injecting React components.
 *
 * @param  {String}    str    A string to be interpolated
 * @param  {Object}    scope  An object with variable names and their
 *                            replacements
 * @return {String|Component} A string or React component
 */
export default function interpolate(str, scope = {}) {
  if (!str) {
    return str
  }

  // Split string into array with regular text and variables split
  // into separate segments, like ['This is a ', '{{ thing }}', '!']
  const parts = str.split(new RegExp(variableRegex)).filter((x) => x)

  // If the only thing we have is a single regular string, just return it as is
  if (parts.length === 1 && isTemplateVariable(parts[0]) === false) {
    return str
  }

  const interpolatedParts = parts.map((part, i) => {
    const key = `${part}_${i}`

    // Not a template variable, return simple <> with a string
    if (isTemplateVariable(part) === false) {
      return parts[i]
    }

    const keyName = part.replace(/^\{\{\s/, '').replace(/\s\}\}$/, '')
    const [scopeKey, scopeChildren] = keyName.split(/:([^]+)/)

    // No matching scope replacement, return raw string
    if (scope[scopeKey] === undefined) {
      return parts[i]
    }

    const replacement = scope[scopeKey]

    // Let the caller create the result
    if (typeof replacement === 'function') {
      return replacement(scopeChildren)
    }

    // If the interpolated scope variable is not a React element, render
    // it as a string inside a <span>
    if (React.isValidElement(replacement) === false) {
      return String(replacement)
    }

    // Returns a clone of the to-be injected element, passing child content
    // from the scope if it exists
    return scopeChildren === undefined
      ? React.cloneElement(replacement, { key })
      : React.cloneElement(replacement, { key }, scopeChildren)
  })

  if (interpolatedParts.every((part) => React.isValidElement(part) === false)) {
    return interpolatedParts.join('')
  }
  return <>{React.Children.toArray(interpolatedParts)}</>
}
