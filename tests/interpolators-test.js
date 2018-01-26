/* eslint-env node, mocha */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme'

import {
  interpolateComponents,
  interpolateString,
  isTemplateVariable,
} from '../src/interpolators.js'

chai.use(chaiEnzyme())

describe('interpolateString()', () => {
  it('returns the input string as is if it does not contain any variables', () => {
    const result = interpolateString('wow')
    expect(result).to.equal('wow')
  })

  it('replaces multiple variables correctly', () => {
    const result = interpolateString('{{ name1 }} knows {{ name2 }}', { name1: 'Abdel', name2: 'Steph' })
    expect(result).to.equal('Abdel knows Steph')
  })

  it('replaces multiple instances of the same variable correctly', () => {
    const result = interpolateString('{{ spam }}, {{ spam }}, {{ spam }} and {{ spam }}', { spam: 'spam' })
    expect(result).to.equal('spam, spam, spam and spam')
  })

  it('returns a template variable with an undefined value in its original form', () => {
    const result = interpolateString('This behaviour is {{ und }}', { und: undefined })
    expect(result).to.equal('This behaviour is {{ und }}')
  })

  it('supports new lines in the passed string', () => {
    const result = interpolateString('First row\nSecond row')
    expect(result).to.equal('First row\nSecond row')
  })

  it('supports new lines in template variable values', () => {
    const slimShady = 'Hi my name is\nwhat\nmy name is\nwho\nmy name is'
    const result = interpolateString(`{{ slimShady }}`, { slimShady })
    expect(result).to.equal(slimShady)
  })

  it('safely injects non-string variables', () => {
    const result1 = interpolateString('You have {{ swagCount }} swagger', { swagCount: 9 })
    expect(result1).to.equal('You have 9 swagger')

    const result2 = interpolateString('Is there coffee: {{ thereIsCoffee }}', { thereIsCoffee: true })
    expect(result2).to.equal('Is there coffee: true')

    const result3 = interpolateString('Rich kids have {{ NaN }}nies', { NaN: NaN })
    expect(result3).to.equal('Rich kids have NaNnies')

    const result4 = interpolateString('Say "object": {{ obj }}', { obj: { objectz: 'Awbyect' } })
    expect(result4).to.equal('Say "object": [object Object]')

    /* eslint-disable */
    const result5 = interpolateString('Dance to the {{ func }}', { func: function beat() {} })
    /* eslint-enable */
    expect(result5).to.equal('Dance to the function beat() {}')
  })
})

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

  it('replaces multiple instances of the same variable correctly', () => {
    const elem = interpolateComponents('{{ spam }}, {{ spam }}, {{ spam }} and {{ spam }}', { spam: 'spam' })
    expect(elem.props.children.length).to.equal(7)
    expect(elem.props.children[0].props.children).to.equal('spam')
    expect(elem.props.children[2].props.children).to.equal('spam')
    expect(elem.props.children[4].props.children).to.equal('spam')
    expect(elem.props.children[6].props.children).to.equal('spam')
  })

  it('returns a template variable with an undefined value in its original form', () => {
    const elem = interpolateComponents('This behaviour is {{ und }}', { und: undefined })
    expect(shallow(elem).text()).to.equal('This behaviour is {{ und }}')
  })

  it('supports new lines in the passed string', () => {
    const elem = interpolateComponents('First row\nSecond row')
    expect(shallow(<span>{elem}</span>).text()).to.equal('First row\nSecond row')
  })

  it('supports new lines in the form of spaces inside an injected scope variable', () => {
    const elem = interpolateComponents('{{ thingy }}', { thingy: '1\n2' })
    expect(shallow(elem).text()).to.equal('1 2')
  })

  it('supports new lines inside template variable values', () => {
    const slimShady = 'Hi my name is\nwhat\nmy name is\nwho\nmy name is'
    const elem = interpolateComponents(`{{ em:${slimShady} }}`, { em: <em /> })
    expect(shallow(elem).text()).to.equal(slimShady)
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

    /* eslint-disable */
    const elem6 = interpolateComponents('Dance to the {{ func }}', { func: function beat() {} })
    /* eslint-enable */
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
    expect(isTemplateVariable('{{ key:with\nnew\nlines }}')).to.equal(true)
    expect(isTemplateVariable('{{ key:🚜 }}')).to.equal(true)
  })
})
