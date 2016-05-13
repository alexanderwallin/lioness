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

  return parts;
};

/**
 * Returns an array of regex matches on a strings
 */
const getMatches = (regex, str) => {
  let arr;
  const matches = [];

  while ((arr = regex.exec(str)) !== null) {
    matches.push(arr[0]);
  }

  return matches;
}

const variableRegex = /\{\{ \w+ \}\}/g;

export const interpolateComponents = (str, scope = {}) => {

  // ['{{ author }}']
  const variableMatches = getMatches(variableRegex, str);

  if (!variableMatches) {
    return str;
  }

  // ['Check the', '{{ author }}', 'for more articles']
  const parts = chopStr(variableMatches, str);

  console.log({ str, scope, variableMatches, parts });

  return (
    <span>
      {parts.map((key, i) => {
        const scopeKey = key.replace(/^\{\{\s/, '').replace(/\s\}\}$/, '');

        if (Object.keys(scope).indexOf(scopeKey) !== -1) {
          return React.createElement('span', { key: scopeKey, }, scope[scopeKey]);
        }

        return React.createElement('span', { key }, parts[i]);
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

