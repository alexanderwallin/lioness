/* eslint-env node, mocha */

import React from 'react'
import { expect } from 'chai'

import { interpolateComponents, isTemplateVariable } from '../src/interpolateComponents.js'

describe('interpolateComponents()', () => {
  it('returns a single element with the input string as is if it has no variables', () => {
    const elem = interpolateComponents('wow')
    expect(elem.props.children).to.equal('wow')
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
