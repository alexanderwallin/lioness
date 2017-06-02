<h1 align="center">
  <img src="https://github.com/alexanderwallin/lioness/blob/master/docs/lioness-logo-2.png?raw=true" />
  <br />
  <br />
  Lioness
  <br />
  <img src="https://badge.fury.io/js/lioness.svg" alt="npm version" class="badge"> <img src="https://travis-ci.org/alexanderwallin/lioness.svg?branch=master" />
</h1>

**Lioness** is a React library for efficiently implementing Gettext localization in your app with little effort.

It utilises [`node-gettext`](https://github.com/alexanderwallin/node-gettext) as translations tool, but this ought to be modularized in the future.

```js
<T
  message="You have one thingy, {{ itemLink:check it out }}"
  messagePlural="You have {{ count }} thingies, {{ listLink:check them out }}"
  count={items.length}
  itemLink={<a href={`/thingies/${items[0].id}`} />}
  listLink={<a href="/thingies" />}
/>
// items.length === 1 => Du har en grej, <a href="/thingies/281">kolla in den här<a/>.
// items.length === 7 => Du har 7 grejer, <a href="/thingies">kolla in dem här<a/>.
```


## Table of contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
  - [Using `<T />`](#using-t-)
  - [Using `withTranslators(Component)`](#using-withtranslatorscomponent)
* [API](#api)
* [Contributing](#contributing)
* [See also](#see-also)


## Features

* Context and plural
* String interpolation using a `{{ variable }}` style syntax
* **Component interpolation** with translatable child content using a `{{ link:Link text here }}` style syntax


## Installation

```sh
npm install --save lioness

# ...or the shorter...
npm i -S lioness
```


## Usage

This is an example app showing how to translate some text:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { LionessProvider, T } from 'lioness'

// messages.json is a JSON file with all translations concatenated into one.
// The format must conform to what node-gettext expects.
//
// See https://github.com/alexanderwallin/node-gettext#Gettext+addTranslations
import messages from './translations/messages.json'

function App({ name, numPotatoes }) {
  return (
    <LionessProvider messages={messages} locale="sv-SE">
      <div className="App">
        <h1><T>Potato inventory</T></h1>
        {/* => <h1><span>Potatisinventarie</span></h1> */}

        <T
          message="Dear {{ name }}, there is one potato left"
          messagePlural="Dear {{ name }}, there are {{ count }} potatoes left"
          count={numPotatoes}
          name={name}
        />
        {/* => <span>Kära Ragnhild, det finns 2 potatisar kvar</span> */}

        <T
          message="By more potatoes {{ link:here }}!"
          link={<a href="http://potatoes.com/buy" />}
        />
        {/* => <span>Köp mer potatis <a href="http://potatoes.com/buy">här</a>!</span> */}
      </div>
    </LionessProvider>
  )
}

ReactDOM.render(
  <App name="Ragnhild" numPotatoes={Math.round(Math.random() * 3))} />,
  document.querySelector('.app-root')
)
```

### Using `<T />`

`<T />` exposes a set of props that make it easy to translate and interpolate your content. Being a React component, it works perfect for when you are composing your UI, like with the example above.

### Using `withTranslators(Component)`

Sometimes, you will need to just translate and interpolate pure strings, without rendering components. To do this you can hook up your components with translator functions using the `withTranslators(Component)` composer function.

`withTranslators(Component)` will provide any component you feed it with a set of translator functions as props. Those props are: `t`, `tn`, `tp`, `tnp`, `tc`, `tcn`, `tcp` and `tcnp`.

```js
import { withTranslators } from 'lioness'

function PotatoNotification({ notificationCode, t }) {
  let message = ''

  if (notificationCode === 'POTATOES_RECEIVED') {
    message = t(`You have received potatoes`)
  }
  else if (notificationCode === 'POTATOES_STOLEN') {
    message = t(`Someone stole all your potatoes :(`)
  }

  return <span>{message}</span>
}

export default withTranslators(PotatoNotification)
```


## API

Working on it! ⚒


## Contributing

All PRs that passes the tests are very much appreciated! 🎂


## See also

* [node-gettext](https://github.com/alexanderwallin/node-gettext) - A JavaScript implementation of Gettext.
* [gettext-parser](https://github.com/smhg/gettext-parser) – A parser between JSON and .po/.mo files. The JSON has the format required by this library.
* [react-gettext-parser](https://github.com/laget-se/react-gettext-parser) – A utility that extracts translatable content from JavaScript code.
* [narp](https://github.com/laget-se/narp) – A workflow utility for extracting, uploading, downloading and integrating translations.
