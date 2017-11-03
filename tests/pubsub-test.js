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

  it('notifies the right subscribers in a group of subscribers', () => {
    const fn1 = spy()
    const fn2 = spy()
    const fn3 = spy()

    subscribe(fn1)
    subscribe(fn2)
    emit()
    expect(fn1.callCount).to.equal(1)
    expect(fn2.callCount).to.equal(1)
    expect(fn3.callCount).to.equal(0)

    subscribe(fn3)
    unsubscribe(fn1)
    emit()
    expect(fn1.callCount).to.equal(1)
    expect(fn2.callCount).to.equal(2)
    expect(fn3.callCount).to.equal(1)

    unsubscribe(fn2)
    emit()
    expect(fn1.callCount).to.equal(1)
    expect(fn2.callCount).to.equal(2)
    expect(fn3.callCount).to.equal(2)
  })

  it('subscribes a function only once', () => {
    const fn = spy()

    subscribe(fn)
    subscribe(fn)
    emit()
    expect(fn.callCount).to.equal(1)
  })
})
