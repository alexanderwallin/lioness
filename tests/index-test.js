/* eslint-env node, mocha */

import { expect } from 'chai'

import {
  interpolateComponents,
  LionessProvider,
  T,
  withTranslators,
} from '../src/index.js'

describe('Package', () => {
  it('Exports interpolateComponents', () => {
    expect(interpolateComponents).to.be.truthy
  })

  it('Exports LionessProvider', () => {
    expect(LionessProvider).to.be.truthy
  })

  it('Exports T', () => {
    expect(T).to.be.truthy
  })

  it('Exports withTranslators', () => {
    expect(withTranslators).to.be.truthy
  })
})
