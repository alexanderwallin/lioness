import React from 'react';

import * as contextTypes from './contextTypes';

/**
 * Provides translation context to a component
 */
export const withLocalization = Component => {
  return {
    ...Component,
    contextTypes: {
      ...Component.contextTypes,
      ...contextTypes,
    },
  };
};

/*
const MyComponent = ({ numItems }, { tn }) =>
  <div className="MyComponent">
    {tn('One item {{ link }}', '{{ count }} items {{ link }}', numItems, {
      count: numItems,
      link: <Link to="/items">Check them</Link>,
    })}
  </div>;

  <div className="MyComponent">
    {tn(
      '[link to:"/items"]One item[/link]',
      '[link to:"/items"]{{ numItems }} items[/link]',
      numItems,
      {
        numItems,
        link: Link,
      },
    )}
  </div>

export default withLocalization(MyComponent);
 */
