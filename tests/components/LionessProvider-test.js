/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'
import { spy } from 'sinon'

import LionessProvider from '../../src/components/LionessProvider.js'
import withTranslation from '../../src/withTranslation.js'

chai.use(chaiEnzyme())

// Fixtures
const MESSAGES = {
  en: {},
  'sv-SE': {},
}

const identity = (x) => x

const adapter = () => ({
  setLocale: () => {},
  translate: () => {},
})

// A child component that will receive the provider's context
function EmptyComponent() {
  return <div />
}
const ContextConsumer = withTranslation(EmptyComponent)

function createProvider(extraProps = {}) {
  return mount(
    <LionessProvider
      messages={MESSAGES}
      locale="en"
      adapter={adapter}
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

  it('accepts a transformInput function as a prop', () => {
    expect(provider.props().transformInput).to.equal(identity)
  })

  it('it sets the Gettext locale (only) when the locale prop changes', () => {
    const setLocaleSpy = spy(provider.instance().translator, 'setLocale')

    provider.setProps({ ...provider.props(), someProp: 123 })
    expect(setLocaleSpy.called).to.equal(false)
    provider.setProps({ ...provider.props(), locale: 'sv-SE' })
    expect(setLocaleSpy.calledWithMatch('sv-SE'))
  })

  it('uses the identity function as string transform function by default', () => {
    const { transformInput } = LionessProvider.defaultProps
    expect(transformInput('\n\t asd \t\n')).to.equal('\n\t asd \t\n')
    const wow = {}
    expect(transformInput(wow)).to.equal(wow)
    const fn = () => {}
    expect(transformInput(fn)).to.equal(fn)
  })
})
