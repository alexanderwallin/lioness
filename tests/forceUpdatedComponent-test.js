/* eslint-env mocha */
/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react'
import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { stub } from 'sinon'
import { mount } from 'enzyme'

import forceUpdatedComponent from '../src/forceUpdatedComponent.js'
import * as pubsub from '../src/pubsub.js'

chai.use(chaiEnzyme())

const Thingy = () => <div>Thingy</div>

describe('forceUpdatedComponent()', () => {
  let ForceUpdatedThingy
  let subscribeStub
  let unsubscribeStub

  beforeEach(() => {
    ForceUpdatedThingy = forceUpdatedComponent(Thingy)
    subscribeStub = stub(pubsub, 'subscribe')
    unsubscribeStub = stub(pubsub, 'unsubscribe')
  })

  afterEach(() => {
    subscribeStub.restore()
    unsubscribeStub.restore()
  })

  it('renders the passed component', () => {
    const app = mount(<ForceUpdatedThingy />)
    expect(app.find(Thingy)).to.have.length(1)
  })

  it('passes on all props to the passed component', () => {
    const props = {
      count: 1619,
      moritz: 'Von Oswald',
      wow: 'This is not bad',
    }
    const appWithProps = mount(<ForceUpdatedThingy {...props} />)

    expect(appWithProps.find(Thingy).props()).to.deep.equal(props)
  })

  it('subscribes its handleNotification function via subscribe()', () => {
    mount(<ForceUpdatedThingy />)
    expect(subscribeStub.callCount).to.equal(1)
  })

  it('unsubscribes its handleNotification function using unsubscribe()', () => {
    const app = mount(<ForceUpdatedThingy />)
    app.unmount()
    expect(unsubscribeStub.callCount).to.equal(1)
  })

  it('updates the lastNotification state value when handleNotification is called', (done) => {
    const app = mount(<ForceUpdatedThingy />)
    expect(app.state().lastNotification).to.equal(null)

    app.instance().handleNotification()
    const notification1 = app.state().lastNotification
    expect(notification1).to.be.above(0)

    setTimeout(() => {
      app.instance().handleNotification()
      expect(app.state().lastNotification).to.be.above(notification1)
      done()
    }, 10)
  })
})
