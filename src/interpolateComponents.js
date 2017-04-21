import React from 'react'

/*

<div>
  {t('Check the {{ author }} for more articles', {
    author: <Link to={`/authors/${author.id}`}>{author.name}</Link>
  })}
</div>

*/

export default interpolateComponents

const variableRegex = /(\{\{\s.+?(?=\s\}\})\s\}\})/g

/**
 * Returns whether a string is a template variable
 */
export function isTemplateVariable(str) {
  return new RegExp(variableRegex).test(str)
}

/**
 * Interpolates a string, replacing template variables with values
 * provided in the scope.
 *
 * Besides replacing variables with
 */
export function interpolateComponents(str, scope = {}) {
  if (!str) {
    return str
  }

  // Split string into array with regular text and variables split
  // into separate segments, like ['This is a ', '{{ thing }}', '!']
  const parts = str.split(new RegExp(variableRegex)).filter(x => x)

  // If the only thing we have is a single regular string, just return it as is
  if (parts.length === 1 && isTemplateVariable(parts[0]) === false) {
    return str
  }

  const interpolatedParts = parts.map((part, i) => {
    const key = `${part}_${i}`

    // Not a template variable, return simple <span> with a string
    if (isTemplateVariable(part) === false) {
      return React.createElement('span', { key }, parts[i])
    }

    let keyName = part.replace(/^\{\{\s/, '').replace(/\s\}\}$/, '')
    let [scopeKey, scopeChildren] = keyName.split(/:(.+)/)

    // No matching scope replacement, return raw string
    if (scope[scopeKey] === undefined) {
      return React.createElement('span', { key }, parts[i])
    }

    const replacement = scope[scopeKey]

    // If the interpolated scope variable is not a React element, render
    // it as a string inside a <span>
    if (React.isValidElement(replacement) === false) {
      return React.createElement('span', { key }, String(replacement))
    }

    // Clone React elements right off
    return React.cloneElement(replacement, { key }, scopeChildren || null)
  })

  return interpolatedParts.length > 1
    ? <span>{interpolatedParts}</span>
    : interpolatedParts[0]
}
