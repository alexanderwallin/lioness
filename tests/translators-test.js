/* eslint-env mocha */

import { expect } from 'chai'
import { stub } from 'sinon'

import { ti, tin, tip, tinp } from '../src/translators.js'

describe('translators', () => {
  const scope = { name: 'francesca' }

  it('apply the provided interpolate function', () => {
    const interpolate = stub()
    const translateIntoNumber = stub()
    translateIntoNumber.onCall(0).returns('0')
    translateIntoNumber.onCall(1).returns('1')
    translateIntoNumber.onCall(2).returns('2')
    translateIntoNumber.onCall(3).returns('3')

    const t1 = ti(interpolate)
    const t2 = tin(interpolate)
    const t3 = tip(interpolate)
    const t4 = tinp(interpolate)

    t1(translateIntoNumber, 'wow', scope)
    t2(translateIntoNumber, 'wow', 'wows', 10, scope)
    t3(translateIntoNumber, 'universe', 'wow', scope)
    t4(translateIntoNumber, 'universe', 'wow', 'wows', 10, scope)

    expect(interpolate.callCount).to.equal(4)
    expect(interpolate.args[0]).to.deep.equal(['0', scope])
    expect(interpolate.args[1]).to.deep.equal(['1', scope])
    expect(interpolate.args[2]).to.deep.equal(['2', scope])
    expect(interpolate.args[3]).to.deep.equal(['3', scope])
  })

  it('apply the provided translate functions', () => {
    const interpolate = stub()
    const translate1 = stub()
    const translate2 = stub()
    const translate3 = stub()
    const translate4 = stub()

    const t1 = ti(interpolate, translate1)
    const t2 = tin(interpolate, translate2)
    const t3 = tip(interpolate, translate3)
    const t4 = tinp(interpolate, translate4)

    t1('wow', scope)
    t2('wow', 'wows', 10, scope)
    t3('universe', 'wow', scope)
    t4('universe', 'wow', 'wows', 10, scope)

    expect(translate1.args[0]).to.deep.equal(['wow'])
    expect(translate2.args[0]).to.deep.equal(['wow', 'wows', 10])
    expect(translate3.args[0]).to.deep.equal(['universe', 'wow'])
    expect(translate4.args[0]).to.deep.equal(['universe', 'wow', 'wows', 10])
  })
})
