/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai'

import trimExcessiveWhitespace from '../src/trimExcessiveWhitespace.js'

describe('trimExcessiveWhitespace()', () => {
  it('replaces all whitespace sequences with a single space and trims the result', () => {
    const inputStr = `
    Lot's of padding going on
    \t here
    `

    expect(trimExcessiveWhitespace(inputStr)).to.equal(
      `Lot's of padding going on here`
    )
  })
})
