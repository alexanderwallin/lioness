<h1 align="center">
  <img src="docs/lioness-logo-3.png" />
  <br />
  Lioness
  <br />
  <img src="https://badge.fury.io/js/lioness.svg" alt="npm version" class="badge"> <img src="https://travis-ci.org/alexanderwallin/lioness.svg?branch=master" />
</h1>

**Lioness** is a flexible React library for implementing Gettext localization.

```js
<T
  one="You have one thingy, {{ itemLink:check it out }}"
  other="You have {{ count }} thingies, {{ listLink:check them out }}"
  count={items.length}
  itemLink={<a href={`/thingies/${items[0].id}`} />}
  listLink={<a href="/thingies" />}
/>
// items.length === 1 => Du har en grej, <a href="/thingies/281">kolla in den här<a/>.
// items.length === 7 => Du har 7 grejer, <a href="/thingies">kolla in dem här<a/>.
```

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Setup](#setup)
  - [Adapters](#adapters)
  - [The Lioness context](#the-lioness-context)
  - [Locale switching](#locale-switching)
  - [Interpolation](#interpolation)
- [API](#api)
- [Contributing](#contributing)
- [See also](#see-also)

## Features

- Context and plural support
- Works with any localization library via adapters
- String and component interpolation using a `{{ link:Link text }}` style syntax
- Locale switching on-the-fly

## Installation

```sh
npm install --save lioness
```

## Usage

### Setup

To use Lioness, you wrap your application in a `<LionessProvider>` and use the component, hook or HOC to render translations. The provider takes an adapter that is responsible for fetching the correct translations.

Here's a basic example of an app that renders some translated content:

```jsx
import React from 'react'
import { createNodeGettextAdapter, LionessProvider, T } from 'lioness'

// What messages.json contains depends on the framework/adapter you use
import messages from './translations/messages.json'

function App() {
  const adapter = createNodeGettextAdapter()
  
  return (
    <LionessProvider
      adapter={adapter}
      messages={messages}
      locale="sv-SE"
    >
      <div className="App">
        <T>Translate me</T>
      </div>
    </LionessProvider>
  )
}
```

### Adapters

Lioness is not coupled to a specific localization framework. Instead it uses adapters to communicate between the React components and your framework of choice.

It comes shipped with a [`node-gettext`](https://github.com/alexanderwallin/node-gettext) adapter:

```js
import { createNodeGettextAdapter } from 'lioness'

const adapter = createNodeGettextAdapter()
```

You can create your own adapter as long as it adhere to the `Adapter` interface:

```js
type Adapter = {
  setup: (messages: any, locale: string) => void
  setLocale: (locale: string) => void
  translate: ({
    one: string
    other?: string
    context?: string
    count?: number
  }: AdapterTranslateParams) => string
}
```

### The Lioness context

Translations are fetched via the `t` and `ti` functions provided via the library's context and accessed using `useTranslation` or `withTranslation`.

```js
type LionessContext = {
  locale: Locale
  t: (input: string) => string
  ti: (params: AdapterTranslateParams, scope: InterpolationScope) => ReactNode
}
```

```jsx
function MyComponent() {
  const { locale, t, ti } = useTranslation()
}
```

### Interpolation

Lioness comes with string and component interpolation using [`interpolate(str, scope)`](#interpolate), meaning you can use variables in your strings and replace them with text, JSX or JSX with injected, translated children. This will get you far without having to use a markdown library or similar.

#### Examples

```jsx
import { interpolate } from 'lioness'

// String variables
interpolate('Hello, {{ name }}', { name: 'World' })
// => "Hello, World"

// JSX variables
interpolate('Give me a {{ break }}', { break: <br /> })
// => <>Give me a <br /></>

// JSX variables with translated children
interpolate('This is {{ strong:important }}, {{ link:read why }}', {
  strong: <strong />,
  link: <a href="https://information.com" />,
})
// => (
//   <>
//     This is <strong>important</strong>, <a href="https://information.com">read why</a>
//   </>
// )
```


### Locale switching

Lioness makes it possible to change locale and have all the application's translations update instantly. `<LionessProvider>` will trigger a re-render of all `<T>` components and components wrapped in `withTranslators()` whenever its `locale` or `messages` props change.

## API

- [`createNodeGettextParser`](#createnodegettextparser)
- [`LionessProvider`](#lionessprovider)
- [`interpolate`](#interpolate)
- [`T`](#t)
- [`t`](#t)
- [`ti`](#ti)
- [`useTranslation`](#usetranslation)
- [`withTranslation`](#withtranslation)


### `createNodeGettextAdapter`

```js
createNodeGettextAdapter(options?: NodeGettextOptions)
```

Returns an adapter for `node-gettext`.

#### Examples

```jsx
import { createNodeGettextAdapter } from 'lioness'

const adapter = createNodeGettextAdapter()
```

### `LionessProvider`

Component that provides the translation functions and current locale to consumers through context.

#### Props

| Prop        | Type        | Description                                  |
|-------------|-------------|----------------------------------------------|
| `adapter`   | `Adapter`   | An adapter instance                          |
| `messages`  | `any`       | Some kind of object containing translations  |
| `locale`    | `string`.   | The currently selected locale                |
| `transformInput` | `(input: string) => string` |  A function that you can use to transform a string before it is sent to the translation function. One use case is normalising strings when something like [`prettier`](https://github.com/prettier/prettier) puts child content inside `<T>` on new lines, with lots of indentation. The default is a function that simply returns the input as is. |

#### Examples

```jsx
import { LionessProvider } from 'lioness'

import { adapter, messages } from './l10n.js'

function App() {
  return (
    <LionessProvider
      adapter={adapter}
      messages={messages}
      locale="sv-SE"
    >
      {/* App components */}
    </LionessProvider>
  )
}
```

### `interpolate`

```js
interpolate = (
  str: string,
  scope: Record<string, ReactNode> = {}
) => ReactNode
```

### `T`

Component that renders translated content. Variables that are to be replaced via interpolation are passed as additional props (see examples).

#### Props

| Prop        | Type        | Description                               |
|-------------|-------------|-------------------------------------------|
| `one`       | `string`    | Message in singular (passed as a prop).   |
| `children`  | `string`    | Message in singular (passed as children). |
| `other`     | `string`    | Message in plural.                        |
| `context`   | `string`    | Gettext context.                          |
| `count`     | `boolean`   | Pluralization count.                      |
| `...props`  | `any`       | Any other props passed to `T` will be added to the interpolation scope. |

#### Returns

Translated and interpolated content.

#### Examples

**Render a simple translation**

```jsx
<T>Have a nice day</T>
```

**Render a pluralized translation**

```jsx
<T one="One thing" other="{{ count }} things" count={things.length} />
```

**Render simple interpolated content**

```jsx
<T one="Welcome, {{ name }}!" name={user.name} />
```

**Render translation with interpolated component**

```jsx
<T one="{{ icon }} Error" icon={<ErrorIcon />} />
```

**Render interpolated component with injected content**

```jsx
<T
  one="Learn more at {{ link:our website }}"
  link={<a href="http://website.com" />}
/>
```

### `t`

```js
t = (message: string) => string
```

Returns the translation for a message in singular and in the default gettext context. This is convenient for when you have simple strings and want to reduce boilerplate.

Accessed through `useTranslation` or `withTranslation`.

#### Arguments

| Argument  | Type     | Description                                    |
|-----------|----------|------------------------------------------------|
| `message` | `string` | A string

#### Examples

```jsx
function MyComponent() {
  const { t, ti } = useTranslation()
  
  // This is a little neater...
  t('A sentence')
  
  // ...than this
  ti({ one: 'A sentence' })
}
```

### `ti`

```js
ti = (params: AdapterTranslateParams, scope: InterpolationScope) => ReactNode
```

Returns an interpolated translation for a pluralized and/or contextual message. Strings are transformed using `LionessProvider#transformInput` before being passed on to the adapter's `translate` function.

Accessed through `useTranslation` or `withTranslation`.

#### Arguments

| Argument  | Type                      | Description                        |
|-----------|---------------------------|------------------------------------|
| `params`  | `AdapterTranslateParams`  | An object of the shape `{ one, other?, count?, context? }` that will be passed to the adapter's `translate` function (after `one` and `other` has been transformed using the `transformInput` function passed to the `LionessProvider` before). |
| `scope`   | `InterpolationScope`      | An object containing key-value replacements for variables in the translated strings. The `params.count` parameter is automatically added to this scope. |

#### Examples

```jsx
import { useTranslation } from 'lioness'

function MyComponent({ user, things }) {
  const { ti } = useTranslation()
  const content = ti(
    {
    	one: '{{ name }}, you have one thing',
    	other: '{{ name }}, you have {{ count }} things',
    	count: things.length,
    },
    { name: user.name }
  )

  return <div>{content}</div>
}
```

### `useTranslation`

```js
useTranslation = () => LionessContext
```

A hook that returns the Lioness context.

#### Examples

**Get translation as string**

```jsx
import { useTranslation } from 'lioness'

function MyComponent() {
  const { t } = useTranslation()
  const str = t('A sentence')
  
  // ...
}
```

**Get interpolated, pluralized translation**

```jsx
import { useTranslation } from 'lioness'

function MyComponent({ user, numAttemps }) {
  const { ti } = useTranslation()
  const str = ti(
    {
      one: '{{ name }} has one more attempt',
      other: '{{ name }} has {{ count }} more attempts',
      count: numAttempts,
    },
    {
      name: user.name
    }
  )
  
  // ...
}
```

### `withTranslation`

```js
withTranslation = (Component: React.ElementType) => React.ElementType
```

A higher-order component that provides `Component` with the Lioness context variables as props. These are `locale`, `t` and `ti`.


## Contributing

All PRs that passes the tests are very much appreciated! 🎂

## See also

- [node-gettext](https://github.com/alexanderwallin/node-gettext) - A JavaScript implementation of Gettext.
- [gettext-parser](https://github.com/smhg/gettext-parser) – A parser between JSON and .po/.mo files. The JSON has the format required by this library.
- [react-gettext-parser](https://github.com/laget-se/react-gettext-parser) – A utility that extracts translatable content from JavaScript code.
- [narp](https://github.com/laget-se/narp) – A workflow utility for extracting, uploading, downloading and integrating translations.
