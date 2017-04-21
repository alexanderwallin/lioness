/* eslint-env node, mocha */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow, mount } from 'enzyme'

import { interpolateComponents, isTemplateVariable } from '../src/interpolateComponents.js'

chai.use(chaiEnzyme())

describe('interpolateComponents()', () => {
  it('returns the input string as is if it does not contain any variables', () => {
    const elem = interpolateComponents('wow')
    expect(elem).to.equal('wow')
  })

  it('returns a single element if the input string is only a variable', () => {
    const elem = interpolateComponents('{{ var }}', { var: 'replacement' })
    expect(elem.props.children).to.equal('replacement')
  })

  it('wraps multiple interpolated variables into a parent <span>', () => {
    const elem = interpolateComponents('{{ name1 }} knows {{ name2 }}', { name1: 'Abdel', name2: 'Steph' })
    expect(elem.type).to.equal('span')
    expect(elem.props.children.length).to.equal(3)
  })

  it('replaces multiple variables correctly', () => {
    const elem = interpolateComponents('{{ name1 }} knows {{ name2 }}', { name1: 'Abdel', name2: 'Steph' })
    expect(elem.props.children[0].props.children).to.equal('Abdel')
    expect(elem.props.children[1].props.children).to.equal(' knows ')
    expect(elem.props.children[2].props.children).to.equal('Steph')
  })

  it('returns a template variable with an undefined value in its original form', () => {
    const elem = interpolateComponents('This behaviour is {{ und }}', { und: undefined })
    expect(shallow(elem).text()).to.equal('This behaviour is {{ und }}')
  })

  it('safely injects non-string variables', () => {
    const elem1 = interpolateComponents('You have {{ swagCount }} swagger', { swagCount: 9 })
    expect(shallow(elem1).text()).to.equal('You have 9 swagger')

    const elem2 = interpolateComponents('Is there coffee: {{ thereIsCoffee }}', { thereIsCoffee: true })
    expect(shallow(elem2).text()).to.equal('Is there coffee: true')

    const elem3 = interpolateComponents('Rich kids have {{ NaN }}nies', { NaN: NaN })
    expect(shallow(elem3).text()).to.equal('Rich kids have NaNnies')

    const elem4 = interpolateComponents('Say "object": {{ obj }}', { obj: { objectz: 'Awbyect' } })
    expect(shallow(elem4).text()).to.equal('Say "object": [object Object]')

    const elem5 = interpolateComponents('Fat {{ strong:5 }}', { strong: <strong /> })
    expect(shallow(elem5).text()).to.equal('Fat 5')

    const elem6 = interpolateComponents('Dance to the {{ func }}', { func: function beat() {} })
    expect(shallow(elem6).text()).to.equal('Dance to the function beat() {}')
  })

  it('replaces a variable with a React element', () => {
    const elem = interpolateComponents('this is a line: {{ line }}', { line: <hr /> })
    expect(elem.props.children[1].type).to.equal('hr')
  })

  it('replaces a variable with a React element and injects content into it', () => {
    const elem = interpolateComponents('go to {{ link:this website }}', { link: <a href="http://website.com" /> })
    const link = elem.props.children[1]
    expect(link.type).to.equal('a')
    expect(link.props.href).to.equal('http://website.com')
    expect(link.props.children).to.equal('this website')
  })
})

describe('isTemplateVariable()', () => {
  it('works', () => {
    expect(isTemplateVariable('okay')).to.equal(false)
    expect(isTemplateVariable('{okay}')).to.equal(false)
    expect(isTemplateVariable('{{okay}}')).to.equal(false)
    expect(isTemplateVariable('{{okay }}')).to.equal(false)
    expect(isTemplateVariable('{{ okay}}')).to.equal(false)

    expect(isTemplateVariable('{{ a }}')).to.equal(true)
    expect(isTemplateVariable('{{ longerVarName }}')).to.equal(true)
    expect(isTemplateVariable('{{ åäöπø¡ }}')).to.equal(true)
    expect(isTemplateVariable('{{ key:value }}')).to.equal(true)
    expect(isTemplateVariable('{{ key:value: }}')).to.equal(true)
    expect(isTemplateVariable('{{ spaced key:with a spaced value }}')).to.equal(true)
  })
})
