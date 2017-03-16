/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow, mount } from 'enzyme'
import { spy, stub } from 'sinon'

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

describe('<T />', () => {
  it('receives locale and translators via context', () => {
    const app = mount(
      <LionessProvider messages={MESSAGES} locale={'en'}>
        <div>
          <T message="wow" />
        </div>
      </LionessProvider>
    )
    const t = app.find(T)
    expect(t.node.context).to.contain.all.keys(['locale', 't', 'tn', 'tp', 'tpn', 'tc', 'tcn', 'tcp', 'tcpn'])
  })

  it('accepts children as input message', () => {
    const t = shallow(<T tcpn={identity}>wow</T>)
    expect(t.props().children).to.equal('wow')
  })

  it('proritises the message prop before children', () => {
    const app = mount(
      <LionessProvider messages={MESSAGES} locale={'en'}>
        <div>
          <T message="i am prop" tcpn={identity}>i am child</T>
        </div>
      </LionessProvider>
    )
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

  // NOTE: withTranslations(Component) overrides the tcpn passed as a prop here,
  //       so how we test this?
  it('gets translations from tcpn')
  // it('gets translations from tcpn', () => {
  //   const tcpn = spy()
  //   mount(<T tcpn={tcpn} content="web" message="one" messagePlural="many" count={3} />)
  //   expect(tcpn.args[0]).to.equal(['web', 'one', 'many', 3])
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
