import React from 'react'
import curry from 'lodash.curry'

/*

<div>
  {t('Check the {{ author }} for more articles', {
    author: <Link to={`/authors/${author.id}`}>{author.name}</Link>
  })}
</div>

*/

const variableRegex = /(\{\{\s[a-zA-Z0-9,.-;:_\s]+\s\}\})/g

/**
 * Returns whether a string is a template variable
 */
const isTemplateVariable = str =>
  variableRegex.test(str)

/**
 * Interpolates a string, replacing template variables with values
 * provided in the scope.
 *
 * Besides replacing variables with
 */
export const interpolateComponents = (str, scope = {}) => {
  if (!str) {
    return str
  }

  // Split string into array with regular text and variables split
  // into separate segments, like ['This is a ', '{{ thing }}', '!']
  const parts = str.split(variableRegex).filter(x => x)

  return (
    <span>
      {parts.map((part, i) => {
        const key = `${part}_${i}`

        // Not a template variable, return simple <span> with a string
        if (isTemplateVariable(part) === false) {
          return React.createElement('span', { key }, parts[i])
        }

        let keyName = part.replace(/^\{\{\s/, '').replace(/\s\}\}$/, '')
        let [scopeKey, scopeChildren] = keyName.split(':')

        // No matching scope replacement, return raw string
        if (!scope[scopeKey]) {
          return React.createElement('span', { key }, parts[i])
        }

        const replacement = scope[scopeKey]

        if (scopeChildren) {
          if (typeof replacement === 'string') {
            return React.createElement('span', { key }, replacement)
          }

          return React.cloneElement(replacement, { key }, scopeChildren)

        }

        return React.createElement('span', { key }, replacement)
      })}
    </span>
  )
}

export const t = curry((translate, message, scope = {}) => {
  return interpolateComponents(translate(message), scope)
})

export const tn = curry((translate, one, other, count, scope = {}) => {
  return interpolateComponents(translate(one, other, count), scope)
})

export const tp = curry((translate, context, message, scope = {}) => {
  return interpolateComponents(translate(context, message), scope)
})

export const tpn = curry((translate, context, one, other, count, scope = {}) => {
  return interpolateComponents(translate(context, one, other, count), scope)
})

