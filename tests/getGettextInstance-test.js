/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
/* eslint dot-notation: 0 */

import { expect } from 'chai'

import getGettextInstance from '../src/getGettextInstance.js'

const MESSAGES = {
  'en': {},
  'sv-SE': {},
}

describe('getGettextInstance()', () => {
  it('constructs a new Gettext instance with the given translations, default locale and options', () => {
    const gt = getGettextInstance(MESSAGES, 'en', { debug: false })
    expect(gt.catalogs['en']).to.be.truthy
    expect(gt.catalogs['sv-SE']).to.be.truthy
    expect(gt.locale).to.equal('en')
    expect(gt.debug).to.equal(false)
  })
})
