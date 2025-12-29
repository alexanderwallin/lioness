/* eslint-env node, mocha */
/* eslint jsx-a11y/anchor-has-content: 0 */
/* eslint jsx-a11y/control-has-associated-label: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme'

import interpolate, { isTemplateVariable } from '../src/interpolate.js'

chai.use(chaiEnzyme())

describe('interpolate() - strings', () => {
  it('returns the input string as is if it does not contain any variables', () => {
    const result = interpolate('wow')
    expect(result).to.equal('wow')
  })

  it('replaces multiple variables correctly', () => {
    const result = interpolate('{{ name1 }} knows {{ name2 }}', {
      name1: 'Abdel',
      name2: 'Steph',
    })
    expect(result).to.equal('Abdel knows Steph')
  })

  it('replaces multiple instances of the same variable correctly', () => {
    const result = interpolate(
      '{{ spam }}, {{ spam }}, {{ spam }} and {{ spam }}',
      { spam: 'spam' }
    )
    expect(result).to.equal('spam, spam, spam and spam')
  })

  it('returns a template variable with an undefined value in its original form', () => {
    const result = interpolate('This behaviour is {{ und }}', {
      und: undefined,
    })
    expect(result).to.equal('This behaviour is {{ und }}')
  })

  it('supports new lines in the passed string', () => {
    const result = interpolate('First row\nSecond row')
    expect(result).to.equal('First row\nSecond row')
  })

  it('supports new lines in template variable values', () => {
    const slimShady = 'Hi my name is\nwhat\nmy name is\nwho\nmy name is'
    const result = interpolate(`{{ slimShady }}`, { slimShady })
    expect(result).to.equal(slimShady)
  })

  it('safely injects non-string variables', () => {
    const result1 = interpolate('You have {{ swagCount }} swagger', {
      swagCount: 9,
    })
    expect(result1).to.equal('You have 9 swagger')

    const result2 = interpolate('Is there coffee: {{ thereIsCoffee }}', {
      thereIsCoffee: true,
    })
    expect(result2).to.equal('Is there coffee: true')

    const result3 = interpolate('Rich kids have {{ NaN }}nies', {
      NaN,
    })
    expect(result3).to.equal('Rich kids have NaNnies')

    const result4 = interpolate('Say "object": {{ obj }}', {
      obj: { objectz: 'Awbyect' },
    })
    expect(result4).to.equal('Say "object": [object Object]')
  })
})

describe('interpolate() - components', () => {
  it('returns the input string as is if it does not contain any variables', () => {
    const elem = interpolate('wow')
    expect(elem).to.equal('wow')
  })

  it('returns a string if all scope variables are strings', () => {
    const elem = interpolate('{{ var1 }} {{ var2 }}', {
      var1: 'strings',
      var2: 'only',
    })
    expect(elem).to.equal('strings only')
  })

  it('wraps multiple interpolated variables into a parent component>', () => {
    const elem = interpolate('{{ name1 }} knows {{ name2 }}', {
      name1: <span>Abdel</span>,
      name2: 'Steph',
    })
    expect(elem.props.children.length).to.equal(3)
  })

  it('replaces multiple variables correctly', () => {
    const elem = interpolate('{{ name1 }} knows {{ name2 }}', {
      name1: <span>Abdel</span>,
      name2: <em>Steph</em>,
    })
    const [abdel, knows, steph] = elem.props.children

    expect(abdel.type).to.equal('span')
    expect(abdel.props.children).to.equal('Abdel')

    expect(knows).to.equal(' knows ')

    expect(steph.type).to.equal('em')
    expect(steph.props.children).to.equal('Steph')
  })

  it('replaces multiple instances of the same variable correctly', () => {
    const elem = interpolate(
      '{{ spam }}, {{ spam }}, {{ spam }} and {{ spam }}',
      { spam: 'spam' }
    )
    expect(elem).to.equal('spam, spam, spam and spam')
  })

  it('returns a template variable with an undefined value in its original form', () => {
    const elem = interpolate('This behaviour is {{ und }}', {
      und: undefined,
    })
    expect(elem).to.equal('This behaviour is {{ und }}')
  })

  it('supports new lines in the passed string', () => {
    const elem = interpolate('First row\nSecond row')
    expect(elem).to.equal('First row\nSecond row')
  })

  it('supports new lines in injected scope variables', () => {
    const elem = interpolate('{{ thingy }}', { thingy: '1\n2' })
    expect(elem).to.equal('1\n2')
  })

  it('supports new lines inside template variable values', () => {
    const slimShady = 'Hi my name is\nwhat\nmy name is\nwho\nmy name is'
    const elem = interpolate(`{{ em:${slimShady} }}`, { em: <em /> })
    expect(shallow(<span>{elem}</span>).text()).to.equal(slimShady)
  })

  it('safely injects non-string variables', () => {
    const elem1 = interpolate('You have {{ swagCount }} swagger', {
      swagCount: 9,
    })
    expect(elem1).to.equal('You have 9 swagger')

    const elem2 = interpolate('Is there coffee: {{ thereIsCoffee }}', {
      thereIsCoffee: true,
    })
    expect(elem2).to.equal('Is there coffee: true')

    const elem3 = interpolate('Rich kids have {{ NaN }}nies', {
      NaN,
    })
    expect(elem3).to.equal('Rich kids have NaNnies')

    const elem4 = interpolate('Say "object": {{ obj }}', {
      obj: { objectz: 'Awbyect' },
    })
    expect(elem4).to.equal('Say "object": [object Object]')

    const elem5 = interpolate('Fat {{ strong:5 }}', {
      strong: <strong />,
    })
    expect(shallow(<span>{elem5}</span>).text()).to.equal('Fat 5')
  })

  it('replaces a variable with a React element', () => {
    const elem = interpolate('this is a line: {{ line }}', {
      line: <hr />,
    })
    expect(elem.props.children[1].type).to.equal('hr')
  })

  it('replaces a variable with a React element and injects content into it', () => {
    const elem = interpolate('go to {{ link:this website }}', {
      link: <a href="http://website.com" />,
    })
    const link = elem.props.children[1]
    expect(link.type).to.equal('a')
    expect(link.props.href).to.equal('http://website.com')
    expect(link.props.children).to.equal('this website')
  })

  it('does not inject content into a React element if there is none specified', () => {
    const elem = interpolate('go to {{ link }}', {
      link: <a href="http://website.com">http://website.com</a>,
    })
    const link = elem.props.children[1]
    expect(link.props.children).to.equal('http://website.com')
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
    expect(isTemplateVariable('{{ spaced key:with a spaced value }}')).to.equal(
      true
    )
    expect(isTemplateVariable('{{ key:with\nnew\nlines }}')).to.equal(true)
    expect(isTemplateVariable('{{ key:🚜 }}')).to.equal(true)
  })
})
