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

const variableRegex = /\{\{ \w+ \}\}/g;

export const interpolateComponents = (str, scope = {}) => {

  // ['{{ author }}']
  const variableMatches = variableRegex.exec(str);

  // ['Check the', '{{ author }}', 'for more articles']
  const parts = str.split(variableRegex);

  return (
    <span>
      {Object.keys(parts).map(key => {
        const scopeKey = key.replace(/^\{\{\s/, '').replace(/\s\}\}$/, '');

        if (Object.keys(scope).indexOf(scopeKey) !== -1) {
          return React.Children.only(scope[scopeKey]);
        }

        return parts[key];
      })}
    </span>
  );
};

export const t = curry((translate, message, scope = {}) => {
  return interpolateComponents(translate(message), scope);
});

export const tn = curry((translate, one, other, scope = {}) => {
  return interpolateComponents(translate(one, other), scope);
});

export const tp = curry((translate, context, message, scope = {}) => {
  return interpolateComponents(translate(context, message), scope);
});

export const tpn = curry((translate, context, one, other, count, scope = {}) => {
  return interpolateComponents(translate(context, one, other, count), scope);
});

