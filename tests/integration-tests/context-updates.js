/* eslint-env mocha */

import React from 'react'
import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'
import { shouldUpdate } from 'recompose'

import LionessProvider from '../../src/components/LionessProvider.js'
import T from '../../src/components/T.js'

chai.use(chaiEnzyme())

const MESSAGES = {
  en: {},
  'sv-SE': {},
}

// eslint-disable-next-line
const Parent = ({ children }) => <div>{children}</div>
const FreezedParent = shouldUpdate(() => false)(Parent)

describe('Context updates', () => {
  it('forces <T> to re-render when <LionessProvider> gets a new locale or dictionary', () => {
    const app = mount(
      <LionessProvider messages={MESSAGES} locale="en">
        <FreezedParent>
          <T message="wow" />
        </FreezedParent>
      </LionessProvider>
    )

    const t = app.find(T)
    expect(t.parent().props().locale).to.equal('en')

    app.setProps({ locale: 'sv-SE' })
    expect(t.parent().props().locale).to.equal('sv-SE')

    const newMessages = { ...MESSAGES }
    app.setProps({ messages: newMessages })
    expect(t.parent().props().messages).to.deep.equal(newMessages)
  })
})
