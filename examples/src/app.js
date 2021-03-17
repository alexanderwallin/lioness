import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { LionessProvider, T, withTranslators } from '../../dist/index.js'

const messages = {
  en: {
    charset: 'utf-8',
    headers: {
      'project-id-version': 'lab',
      'pot-creation-date': 'Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)',
      'po-revision-date': '2016-04-22 10:01+0000',
      'last-translator': 'alexanderwallin <office@alexanderwallin.com>',
      'language-team':
        'English (http://www.transifex.com/alexanderwallin/lab/language/en/)',
      'content-type': 'text/plain; charset=UTF-8',
      'content-transfer-encoding': '8bit',
      language: 'en',
      'plural-forms': 'nplurals=2; plural=(n != 1);',
    },
    translations: {
      '': {
        '': {
          msgid: '',
          comments: {
            translator: '\nTranslators:',
          },
          msgstr: [
            'Project-Id-Version: lab\nPOT-Creation-Date: Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)\nPO-Revision-Date: 2016-04-22 10:01+0000\nLast-Translator: alexanderwallin <office@alexanderwallin.com>\nLanguage-Team: English (http://www.transifex.com/aleaxnderwallin/lab/language/en/)\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\nLanguage: en\nPlural-Forms: nplurals=2; plural=(n != 1);\n',
          ],
        },
        Close: {
          msgid: 'Close',
          comments: {
            reference: './src/filtering/components/FilterBox.jsx:29',
          },
          msgstr: ['Close'],
        },
      },
    },
  },
  sv: {
    charset: 'utf-8',
    headers: {
      'project-id-version': 'lab',
      'pot-creation-date': 'Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)',
      'po-revision-date': '2016-04-22 10:02+0000',
      'last-translator': 'Alexander Wallin <office@alexanderwallin.com>',
      'language-team':
        'Swedish (http://www.transifex.com/alexanderwallin/lab/language/sv/)',
      'content-type': 'text/plain; charset=UTF-8',
      'content-transfer-encoding': '8bit',
      language: 'sv',
      'plural-forms': 'nplurals=2; plural=(n != 1);',
    },
    translations: {
      '': {
        '': {
          msgid: '',
          comments: {
            translator:
              '\nTranslators:\nAlexander Wallin <office@alexanderwallin.com>, 2016',
          },
          msgstr: [
            'Project-Id-Version: club-admin\nPOT-Creation-Date: Fri Apr 22 2016 12:01:59 GMT+0200 (CEST)\nPO-Revision-Date: 2016-04-22 10:02+0000\nLast-Translator: Alexander Wallin <office@alexanderwallin.com>\nLanguage-Team: Swedish (http://www.transifex.com/alexanderwallin/lab/language/sv/)\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\nLanguage: sv\nPlural-Forms: nplurals=2; plural=(n != 1);\n',
          ],
        },
        Close: {
          msgid: 'Close',
          comments: {
            reference: './src/filtering/components/FilterBox.jsx:29',
          },
          msgstr: ['Stäng'],
        },
      },
    },
  },
}

//
let MyThing = ({ t, message }) => <p>{t(message)}</p>

MyThing = withTranslators(MyThing)

// Singular/plural
const Diff = withTranslators(({ tcn, num }) => (
  <div>
    {tcn('{{ one:One }} thing ({{ link:Add more }})', '{{ num }} things', num, {
      one: <em />,
      link: <a href="#add-more" />,
      num: num,
    })}
  </div>
))

// A clickable number
const ClickableNumber = () => (
  <em onClick={() => alert('click')} style={{ cursor: 'pointer' }}>
    131
  </em>
)

// A pure interpolated string
const HoverableItemWithNumber = withTranslators(({ t, itemNumber }) => (
  <div title={t('This is item number {{ itemNumber }}', { itemNumber })}>
    Hover me to see my number
  </div>
))

/**
 * Example app
 */
const App = () => {
  const [locale, setLocale] = useState('sv')
  return (
    <LionessProvider locale={locale} messages={messages}>
      <div className="App">
        <button
          onClick={() => setLocale('en')}
          style={locale === 'en' ? { fontWeight: 'bold' } : {}}
        >
          English
        </button>
        <button
          onClick={() => setLocale('sv')}
          style={locale === 'sv' ? { fontWeight: 'bold' } : {}}
        >
          Swedish
        </button>

        <hr />

        <pre>
          {'<T message="Clap {{ num }} times" num={<ClickableNumber />} />'}
        </pre>
        <T message="Clap {{ num }} times" num={<ClickableNumber />} />

        <hr />
        <pre>{'<p><T>Hello</T></p>'}</pre>
        <p>
          <T>Hello</T>
        </p>

        <hr />
        <pre>{'<MyThing message="Close" />'}</pre>
        <MyThing message="Close" />

        <hr />
        <pre>{`const Diff = withTranslators(({ tcn, num }) => (
  <div>
    {tcn('{{ one:One }} thing ({{ link:Add more }})', '{{ num }} things', num, {
      one: <em />,
      link: <a href="#add-more" />,
      num: num,
    })}
  </div>
));

/* ... */

<Diff num={1} />
<Diff num={2} />`}</pre>
        <Diff num={1} />
        <Diff num={2} />

        <hr />
        <pre>{`const HoverableItemWithNumber = withTranslators(({ t, itemNumber }) => (
  <div title={t('This is item number {{ itemNumber }}', { itemNumber })}>
    Hover me to see my number
  </div>
))

<HoverableItemWithNumber itemNumber={1} />
<HoverableItemWithNumber itemNumber={2} />`}</pre>
        <HoverableItemWithNumber itemNumber={1} />
        <HoverableItemWithNumber itemNumber={2} />
      </div>
    </LionessProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
