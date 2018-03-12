/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'
import { spy, stub } from 'sinon'
import Gettext from 'node-gettext'

import LionessProvider from '../../src/components/LionessProvider.js'
import * as gti from '../../src/getGettextInstance.js'
import * as pubsub from '../../src/pubsub.js'
import withTranslators from '../../src/withTranslators.js'

chai.use(chaiEnzyme())

// Fixtures
const MESSAGES = {
  en: {},
  'sv-SE': {},
}

const identity = x => x

// A child component that will receive the provider's context
function EmptyComponent() {
  return <div />
}
const ContextConsumer = withTranslators(EmptyComponent)

function createProvider(extraProps = {}) {
  return mount(
    <LionessProvider
      messages={MESSAGES}
      locale={'en'}
      {...extraProps}
      transformInput={identity}
    >
      <ContextConsumer />
    </LionessProvider>
  )
}

describe('<LionessProvider />', () => {
  let provider

  beforeEach(() => {
    provider = createProvider()
  })

  it('accepts a locale as prop', () => {
    expect(provider.props().locale).to.equal('en')
  })

  it('accepts an object of messages/translations as a prop', () => {
    expect(provider.props().messages).to.deep.equal(MESSAGES)
  })

  it('accepts a transformInput function as a prop')

  it('constructors a Gettext instance using its given props', () => {
    expect(provider.node.gt).to.be.truthy
    expect(provider.node.gt).to.be.an.instanceof(Gettext)
  })

  it('passes on the debug prop in an options object if it is set to a boolean', () => {
    spy(gti, 'default')

    createProvider()
    expect(gti.default.args[0]).to.deep.equal([MESSAGES, 'en', {}])

    createProvider({ debug: true })
    expect(gti.default.args[1]).to.deep.equal([MESSAGES, 'en', { debug: true }])

    createProvider({ debug: false })
    expect(gti.default.args[2]).to.deep.equal([
      MESSAGES,
      'en',
      { debug: false },
    ])

    gti.default.restore()
  })

  it('it sets the Gettext locale (only) when the locale prop changes', () => {
    const setLocaleSpy = spy(provider.node.gt, 'setLocale')

    provider.setProps({ ...provider.props(), messages: {} })
    expect(setLocaleSpy.called).to.equal(false)
    provider.setProps({ ...provider.props(), locale: 'sv-SE' })
    expect(setLocaleSpy.calledWithMatch('sv-SE'))
  })

  it('provides the current locale through its child context', () => {
    const consumer = provider.find(ContextConsumer)
    expect(consumer.node.context.locale).to.equal('en')
    provider.setProps({ ...provider.props(), locale: 'sv-SE' })
    expect(consumer.node.context.locale).to.equal('sv-SE')
  })

  it('provides all translators through its child context', () => {
    const consumer = provider.find(ContextConsumer)
    expect(consumer.node.context).to.contain.all.keys([
      't',
      'tn',
      'tp',
      'tnp',
      'tc',
      'tcn',
      'tcp',
      'tcnp',
    ])
  })

  it('calls the pubsub emit() function whenever the `locale` or `messages` props change', () => {
    const emitStub = stub(pubsub, 'emit')

    provider.setProps({ locale: 'sv-SE' })
    expect(emitStub.callCount).to.equal(1)

    provider.setProps({ messages: { ...MESSAGES } })
    expect(emitStub.callCount).to.equal(2)

    provider.setProps({ debug: true })
    expect(emitStub.callCount).to.equal(2)

    emitStub.restore()
  })
})
