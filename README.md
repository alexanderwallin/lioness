![lioness](docs/lioness-react.png)

Makes your gettext life in the React world a breeze.

The purpose of `lioness` is to provide your React application with gettext localization that:

* uses actual messages as keys, i.e. `t("Welcome!")` instead of `t(messages.home.welcome)`;
* makes it easy to insert React elements into translated strings; and
* is easy to implement.

As of now, `lioness` utilises `node-gettext` for translations, which makes it a great fit inside the [`narp` workflow](https://github.com/laget-se/narp). This might/should be modularized in the future.

### Table of contents

* [Features](#features)
* [Examples](#examples)
* [Installation](#installation)
* [API](#api)

### Features

1. Translates messages with singular, plural and context parameters
2. Supports template variables
3. Supports React components as template variable values
4. Provides a component template variable syntax for controlling component elements and its translated inner content separately
5. Localization context provider (`LionessProvider`) plus compose helper (`withTranslators()`) for hooking up a component with the translation functions

### Examples

The magical `t`/`tn`/`tp`/`tpn` props in the following examples comes from [`withTranslators()`](#composers).

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

#### 2. Supports template variables

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

import { LionessProvider } from 'lioness';

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
import { withTranslators } from 'lioness';

let Thing = ({ t }) =>
  <span>{t('Translate me')}</span>;

// Provide translators to Thing
Thing = withTranslators(Thing);

export default Things;
```

### Installation

```sh
npm i -S lioness
```

### API

#### Translation functions

```js
t(message, scope = {})

tn(one, other, count, scope = {})

tp(context, message, scope = {})

tpn(context, one, other, count, scope = {})
```

##### `scope` variables

Anything expressed with `... {{ varName }} ...` in a string can be populated from corresponding key/value pairs in the `scope` object, for example:

```js
t('Song: {{ song }}', { song: 'Christina Aguilera - Beautiful' });
```

##### React elements as template variable values

You can insert any React element as value for an template variable.

```js
t('Song: {{ songLink }}', {
  songLink: <a href="...">Christina Aguilera - Beautiful</a>
});
```

##### React elements with translated inner content as template variable values

Inserting React elements into template string is good an all, but sometimes you need to translate the contents of the element itself. This is what the **component template syntax** is for:

```js
{{ scopeKey:Element child contents }}
```

This is implemented like:

```js
t('Go ahead and {{ songLink:listen now }}', {
  songLink: <a href={songurl} />
});
```

where `"listen now"` will be inserted into the `<a>` element.

#### Composers

```js
/**
 * Provides the given component with all translator functions
 * as props
 */
withTranslators(Component);
```
