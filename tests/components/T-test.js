/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow, mount } from 'enzyme'
// import { spy, stub } from 'sinon'

import LionessProvider from '../../src/components/LionessProvider.js'
import T from '../../src/components/T.js'

chai.use(chaiEnzyme())

const identity = x => x

// Translation fixtures
const MESSAGES = {
  'en': {
    'translations': {
      '': {
        'hi there': {
          'msid': 'hi there',
          'msgstr': 'hi there',
        },
      },
    },
  },
  'sv-SE': {
    'translations': {
      '': {
        'hi there': {
          'msid': 'hi there',
          'msgstr': 'hallå där',
        },
      },
    },
  },
}

const CODES = {
  'en': {
    'translations': {
      '': {
        'HI_THERE': {
          'msgid': 'HI_THERE',
          'msgstr': 'HI_THERE',
        },
      },
    },
  },
  'sv-SE': {
    'translations': {
      '': {
        'HI_THERE': {
          'msgid': 'HI_THERE',
          'msgstr': 'HALLÅ_DÄR',
        },
      },
    },
  },
}

function App({ children }) {
  return (
    <LionessProvider messages={MESSAGES} locale={'en'}>
      <div>
        {children}
      </div>
    </LionessProvider>
  )
}

describe('<T />', () => {
  it('receives locale, textDomain and translators via context', () => {
    const app = mount(<App><T message="wow" /></App>)
    expect(app.find(T).node.context).to.contain.all.keys(
      ['locale', 'textDomain', 't', 'tn', 'tp', 'td', 'tpn', 'tdn', 'tdp', 'tdnp', 'tc', 'tcn', 'tcp', 'tcd', 'tcpn', 'tcdp', 'tcdn', 'tcdnp']
    )
  })

  it('accepts children as input message', () => {
    const app = shallow(<App><T>wow</T></App>)
    expect(app.find(T).props().children).to.equal('wow')
  })

  it('proritises the message prop before children', () => {
    const app = mount(<App><T message="i am prop">i am child</T></App>)
    expect(app.find(T).text()).to.equal('i am prop')
  })

  // NOTE: How to test prop type validations? This is not working a.t.m.
  it('throws an error when neither message nor string-only children are provided')
  // it('throws an error when neither message nor string-only children are provided', () => {
  //   const consoleError = stub(console, 'error')
  //   const t = <T tcpn={identity} />
  //   expect(consoleError.calledOnce).to.equal(true)
  //   console.error.restore()
  // })

  // NOTE: withTranslations(Component) overrides the tcdnp passed as a prop here,
  //       so how we test this?
  it('gets translations from tcdnp')
  // it('gets translations from tcdnp', () => {
  //   const tcdnp = spy()
  //   mount(<T tcdnp={tcdnp} textDomain="messages" context="web" message="one" messagePlural="many" count={3} />)
  //   expect(tcdnp.args[0]).to.equal(['messages', 'web', 'one', 'many', 3])
  // })

  // Same problem here as the above...
  it('includes count in interpolation scope')

  // ...and here
  it('excludes context provided props from the interpolation scope')

  it('always returns a renderable React component', () => {
    const app = mount(
      <LionessProvider messages={MESSAGES} locale={'en'}>
        <div>
          <T message="simple message" />
        </div>
      </LionessProvider>
    )

    expect(app.find(T).find('span')).to.have.length(1)
  })
})
