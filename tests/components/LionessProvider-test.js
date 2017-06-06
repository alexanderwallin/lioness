/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'
import { spy } from 'sinon'
import Gettext from 'node-gettext'

import LionessProvider from '../../src/components/LionessProvider.js'
import withTranslators from '../../src/withTranslators.js'

chai.use(chaiEnzyme())

// Fixtures
const MESSAGES = {
  'en': {},
  'sv-SE': {},
}

// A child component that will receive the provider's context
function EmptyComponent() {
  return <div />
}
const ContextConsumer = withTranslators(EmptyComponent)

describe('<LionessProvider />', () => {
  let provider

  beforeEach(() => {
    provider = mount(
      <LionessProvider messages={MESSAGES} locale={'en'}>
        <ContextConsumer />
      </LionessProvider>
    )
  })

  it('accepts a locale as prop', () => {
    expect(provider.props().locale).to.equal('en')
  })

  it('accepts an object of messages/translations as a prop', () => {
    expect(provider.props().messages).to.deep.equal(MESSAGES)
  })

  it('constructors a Gettext instance using its given props', () => {
    expect(provider.node.gt).to.be.truthy
    expect(provider.node.gt).to.be.an.instanceof(Gettext)
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
    expect(consumer.node.context).to.contain.all.keys(['t', 'tn', 'tp', 'tnp', 'tc', 'tcn', 'tcp', 'tcnp'])
  })
})
