![lioness-react](docs/lioness-react.png)

Makes your gettext life in the React world a breeze.

### Table of contents

* [Features](#features)

### Features

1. Translates messages with singular, plural and context parameters
2. Handles template variables, populated using equally named props
3. Supports React components as template variable values
4. Provides a component template variable syntax for controlling component elements and its translated inner content separately
5. Localization context provider (`LionessProvider`) plus compose helper (`withTranslators()`) for hooking up a component with the translation functions

### Examples

#### 1. Translates messages with singular, plural and context parameters

```js
// Basic translation
const WelcomeMessage = ({ t }) =>
  <span>{t('Hiya')}</span>;

// Plural translation
const Amount = ({ numThings, tn }) =>
  <span>{tn('One thing', 'Many things', numThings)}</span>;

// Translations in different contexts
const BackButton = ({ tp }) =>
  <span>{tp('navigation', 'Back')}</span>;

const PlayerPosition = ({ tp }) =>
  <span>{tp('football', 'Back')}</span>;

// Pluralized translation in a cart context
const CartSummary = ({ numItems, tpn }) =>
  <span>{tpn('cart', 'One item', 'Multiple items', numItems)}</span>;
```

#### 2. Handles template variables, populated using equally named props

```js
// Inserting the count into a pluralized translation
const MessageCount = ({ numMessages, tn }) =>
  <span>{tn('One message', '{{ count }} messages', numMessages, { count: numMessages })}</span>;
```

#### 3. Supports React components as template variable values

```js
// Insert an <a> tag
const ArticleAuthor = ({ author, t }} =>
  <span>
    {t('Read more from {{ authorLink }}', {
      authorLink: <a href={`/authors/${author.id}`}>{author.name}</a>
    })}
  </span>;
```

#### 4. Provides a component template variable syntax for controlling component elements and its translated inner content separately

```js
// Insert a component with translated child content
const MovieTeaser = ({ movie, t }) =>
  <span>
    {t('Watch {{ movieName }} while {{ link:it\'s hot! }}', {
      movieName: <strong>{movie.title}</strong>,
      link: <a href={movie.press.buzzbeed.url} />
    })}
  </span>;

// -> Watch <strong>Titanic</strong> while <a href="http://buzzfeed.com/titanic-is-hot">it's hot!</a> 
```

#### 5. Localization context provider (`LionessProvider`) plus compose helper (`withTranslators()`) for hooking up a component with the translation functions

Wrapping your app inside `LionessProvider`:

```js
// main.js

import { LionessProvider } from 'lioness-react';

import translations from './translations.json';
import App from './App.js';

// Wrap your app inside LionessProvider to provide its children
// with translators
export default () =>
  <LionessProvider locale="en" messages={translations}>
    <App />
  </LionessProvider>;
```

Providing translator functions to components:

```js
// Thing.js
import React from 'react';
import { withTranslators } from 'lioness-react';

let Thing = ({ t }) =>
  <span>{t('Translate me')}</span>;
  
// Provide translators to Thing
Thing = withTranslators(Things);

export default Things;
```
