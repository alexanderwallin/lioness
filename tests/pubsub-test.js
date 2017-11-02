/* eslint-env mocha */

import { describe, it } from 'mocha'
import { expect } from 'chai'
import { spy } from 'sinon'

import { emit, subscribe, unsubscribe } from '../src/pubsub.js'

describe('subscribe() and unsubscribe()', () => {
  it('registers and invokes a function passed to subscribe() when emit() is called', () => {
    const fn = spy()

    emit()
    expect(fn.called).to.equal(false)

    subscribe(fn)
    emit()
    expect(fn.callCount).to.equal(1)
    emit()
    expect(fn.callCount).to.equal(2)

    unsubscribe(fn)
    emit()
    expect(fn.callCount).to.equal(2)
  })
})
