import React from 'react';
import interpolate from 'interpolate';
import curry from 'lodash.curry';

/*

<div>
  {t('Check the {{ author }} for more articles', {
    author: <Link to={`/authors/${author.id}`}>{author.name}</Link>
  })}
</div>

*/

const variableRegex = /\{\{\s[a-zA-Z0-9,.-;:_\s]+\s\}\}/g;

const splitStr = (index, str) =>
  [str.substring(0, index), str.substr(index)];

/**
 * const str = 'Check the {{ author }} for more articles';
 * const chops = ['{{ author }}'];
 *
 * chopStr(chops, str);
 * // -> ['Check the ', '{{ author }}', ' for more articles']
 */
const chopStr = (chops, str) => {
  const indices = chops.reduce((aggr, x) => {
    const i = str.indexOf(x);
    return i >= 0
      ? aggr.concat([i, i + x.length])
      : aggr;
  }, []);

  const parts = [];
  let lastChopIndex = 0;
  indices.forEach(i => {
    const part = str.substring(lastChopIndex, i);
    parts.push(part);
    lastChopIndex = i;
  });
  parts.push(str.substr(lastChopIndex));

  return parts.filter(x => x);
};

/**
 * Returns an array of regex matches on a strings
 */
const getMatches = (regExpr, str) => {
  let arr;
  const matches = [];

  while ((arr = regExpr.exec(str)) !== null) {
    matches.push(arr[0]);
  }

  return matches;
}

/**
 * Returns whether a string is a template variable
 */
const isTemplateVariable = str =>
  variableRegex.test(str);

/**
 * Interpolates a string, replacing template variables with values
 * provided in the scope.
 *
 * Besides replacing variables with
 */
export const interpolateComponents = (str, scope = {}) => {

  // ['{{ author }}']
  const variableMatches = getMatches(variableRegex, str);

  if (!variableMatches) {
    return str;
  }

  // ['Check the', '{{ author }}', 'for more articles']
  const parts = chopStr(variableMatches, str);

  return (
    <span>
      {parts.map((part, i) => {
        const key = `${part}_${i}`;

        // Not a template variable, return simple <span> with a string
        if (isTemplateVariable(part) === false) {
          return React.createElement('span', { key }, parts[i]);
        }

        let keyName = part.replace(/^\{\{\s/, '').replace(/\s\}\}$/, '');
        let [scopeKey, scopeChildren] = keyName.split(':');

        // No matching scope replacement, return raw string
        if (!scope[scopeKey]) {
          return React.createElement('span', { key }, parts[i]);
        }

        const replacement = scope[scopeKey];

        if (scopeChildren) {
          if (typeof replacement === 'string') {
            return React.createElement('span', { key }, replacement);
          }
          else {
            return React.cloneElement(replacement, { key }, scopeChildren);
          }
        }

        return React.createElement('span', { key }, replacement);
      })}
    </span>
  );
};

export const t = curry((translate, message, scope = {}) => {
  return interpolateComponents(translate(message), scope);
});

export const tn = curry((translate, one, other, count, scope = {}) => {
  return interpolateComponents(translate(one, other, count), scope);
});

export const tp = curry((translate, context, message, scope = {}) => {
  return interpolateComponents(translate(context, message), scope);
});

export const tpn = curry((translate, context, one, other, count, scope = {}) => {
  return interpolateComponents(translate(context, one, other, count), scope);
});

