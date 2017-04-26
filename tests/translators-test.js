/* eslint-env mocha */

import { expect } from 'chai'
import { spy, stub } from 'sinon'

import { t, tn, tp, td, tpn, tdn, tdp, tdnp, tc, tcn, tcp, tcd, tcpn, tcdp, tcdn, tcdnp } from '../src/translators.js'

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

  describe('td()', () => {
    it('translates the message using the provided translate function', () => {
      td(translate, 'domain', 'wow')
      expect(translate.calledWithMatch('domain', 'wow')).to.equal(true)
    })
  })

  describe('tcd()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcd(interpolate, translate, 'domain', 'wow', scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tpn()', () => {
    it('translates the message using the provided translate function', () => {
      tpn(translate, 'context', 'wow', 'wows', 1)
      expect(translate.calledWithMatch('context', 'wow', 'wows', 1)).to.equal(true)
    })
  })

  describe('tcpn()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcpn(interpolate, translate, 'context', 'wow', 'wows', 1, scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tdp()', () => {
    it('translates the message using the provided translate function', () => {
      tdp(translate, 'domain', 'context', 'wow')
      expect(translate.calledWithMatch('domain', 'context', 'wow')).to.equal(true)
    })
  })

  describe('tcdp()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcdp(interpolate, translate, 'domain', 'context', 'wow', scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tdn()', () => {
    it('translates the message using the provided translate function', () => {
      tdn(translate, 'context', 'wow', 'wows', 1)
      expect(translate.calledWithMatch('context', 'wow', 'wows', 1)).to.equal(true)
    })
  })

  describe('tcdn()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcdn(interpolate, translate, 'domain', 'wow', 'wow', 1, scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })

  describe('tdnp()', () => {
    it('translates the message using the provided translate function', () => {
      tdnp(translate, 'domain', 'context', 'wow', 'wows', 1)
      expect(translate.calledWithMatch('domain', 'context', 'wow', 'wows', 1)).to.equal(true)
    })
  })

  describe('tcdnp()', () => {
    it('interpolates the translated string with the provided scope', () => {
      tcdnp(interpolate, translate, 'domain', 'context', 'wow', 'wow', 1, scope)
      expect(interpolate.calledWithMatch('groundhog day', scope)).to.equal(true)
    })
  })
})
