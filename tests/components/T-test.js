/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow, mount } from 'enzyme'
import { stub } from 'sinon'
// import { spy, stub } from 'sinon'

import LionessProvider from '../../src/components/LionessProvider.js'
import T from '../../src/components/T.js'

chai.use(chaiEnzyme())

// Translation fixtures
const MESSAGES = {
  en: {
    charset: 'utf-8',
    headers: {},
    translations: {
      '': {
        'hi there': {
          msgid: 'hi there',
          msgstr: 'hi there',
        },
      },
    },
  },
  'sv-SE': {
    charset: 'utf-8',
    headers: {},
    translations: {
      '': {
        'hi there': {
          msgid: 'hi there',
          msgstr: 'hallå där',
        },
      },
    },
  },
}

const identity = (x) => x

// eslint-disable-next-line
function App({ children }) {
  return (
    <LionessProvider messages={MESSAGES} locale="en" transformInput={identity}>
      <div>{children}</div>
    </LionessProvider>
  )
}

describe('<T />', () => {
  it('receives locale, translators and string transform function via context', () => {
    const app = mount(
      <App>
        <T message="wow" />
      </App>
    )
    expect(app.find(T).instance().context()).to.contain.all.keys([
      'locale',
      't',
      'tn',
      'tp',
      'tnp',
      'tc',
      'tcn',
      'tcp',
      'tcnp',
      'transformInput',
    ])
  })

  it('accepts children as input message', () => {
    const app = shallow(
      <App>
        <T>wow</T>
      </App>
    )
    expect(app.find(T).props().children).to.equal('wow')
  })

  it('proritises the message prop before children', () => {
    const app = mount(
      <App>
        <T message="i am prop">i am child</T>
      </App>
    )
    expect(app.find(T).text()).to.equal('i am prop')
  })

  // NOTE: How to test prop type validations? This is not working a.t.m.
  it(
    'throws an error when neither message nor string-only children are provided'
  )
  // it('throws an error when neither message nor string-only children are provided', () => {
  //   const consoleError = stub(console, 'error')
  //   const t = <T tcnp={identity} />
  //   expect(consoleError.calledOnce).to.equal(true)
  //   console.error.restore()
  // })

  // NOTE: withTranslations(Component) overrides the tcnp passed as a prop here,
  //       so how we test this?
  it('gets translations from tcnp')
  // it('gets translations from tcnp', () => {
  //   const tcnp = spy()
  //   mount(<T tcnp={tcnp} content="web" message="one" messagePlural="many" count={3} />)
  //   expect(tcnp.args[0]).to.equal(['web', 'one', 'many', 3])
  // })

  // Same problem here as the above...
  it('includes count in interpolation scope')

  // ...and here
  it('excludes context provided props from the interpolation scope')

  it('transforms input strings using the transformInput context prop', () => {
    const transformSpy = stub().returns('wow')
    mount(
      <LionessProvider
        messages={MESSAGES}
        locale="en"
        transformInput={transformSpy}
      >
        <div>
          <T>wow</T>
        </div>
      </LionessProvider>
    )
    expect(transformSpy.calledWith('wow')).to.equal(true)
  })

  it('always returns a renderable React component', () => {
    const app = mount(
      <LionessProvider messages={MESSAGES} locale="en">
        <div>
          <T message="simple message" />
        </div>
      </LionessProvider>
    )

    expect(app.find(T).find('span')).to.have.length(1)
  })
})
