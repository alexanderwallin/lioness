/* eslint-env mocha */

import { expect } from 'chai'
import { spy, stub } from 'sinon'

import { t, tp, tn, tpn } from '../src/translators.js'

describe('translators', () => {
  let interpolate
  let translate
  const scope = { name: 'francesca' }

  beforeEach(() => {
    interpolate = spy()
    translate = stub().returns('groundhog day')
  })

  describe('t()', () => {
    it('translates the message using the provided translate function', () => {
      t(interpolate, translate, 'wow')
      expect(translate.calledWithMatch('wow')).to.equal(true)
    })

    it('interpolates the translated string with the provided scope', () => {
      t(interpolate, translate, 'wow', scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tn()', () => {
    it('translates the message using the provided translate function', () => {
      tn(interpolate, translate, 'wow', 'wows', 12)
      expect(translate.calledWithMatch('wow', 'wows', 12)).to.equal(true)
    })

    it('interpolates the translated string with the provided scope', () => {
      tn(interpolate, translate, 'wow', 'wows', 12, scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tp()', () => {
    it('translates the message using the provided translate function', () => {
      tp(interpolate, translate, 'context', 'wow')
      expect(translate.calledWithMatch('context', 'wow')).to.equal(true)
    })

    it('interpolates the translated string with the provided scope', () => {
      tp(interpolate, translate, 'context', 'wow', scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tpn()', () => {
    it('translates the message using the provided translate function', () => {
      tpn(interpolate, translate, 'context', 'wow', 'wows', 1)
      expect(translate.calledWithMatch('context', 'wow', 'wows', 1)).to.equal(true)
    })

    it('interpolates the translated string with the provided scope', () => {
      tpn(interpolate, translate, 'context', 'wow', 'wows', 1, scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })
})
