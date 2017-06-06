/* eslint-env mocha */

import { expect } from 'chai'
import { spy, stub } from 'sinon'

import { t, tp, tn, tnp, tc, tcp, tcn, tcnp } from '../src/translators.js'

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
      t(translate, 'wow')
      expect(translate.calledWithMatch('wow')).to.equal(true)
    })
  })

  describe('tc()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tc(interpolate, translate, 'wow', scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tn()', () => {
    it('translates the message using the provided translate function', () => {
      tn(translate, 'wow', 'wows', 12)
      expect(translate.calledWithMatch('wow', 'wows', 12)).to.equal(true)
    })
  })

  describe('tcn()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcn(interpolate, translate, 'wow', 'wows', 12, scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tp()', () => {
    it('translates the message using the provided translate function', () => {
      tp(translate, 'context', 'wow')
      expect(translate.calledWithMatch('context', 'wow')).to.equal(true)
    })
  })

  describe('tcp()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcp(interpolate, translate, 'context', 'wow', scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tnp()', () => {
    it('translates the message using the provided translate function', () => {
      tnp(translate, 'context', 'wow', 'wows', 1)
      expect(translate.calledWithMatch('context', 'wow', 'wows', 1)).to.equal(true)
    })
  })

  describe('tcnp()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcnp(interpolate, translate, 'context', 'wow', 'wows', 1, scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })
})
