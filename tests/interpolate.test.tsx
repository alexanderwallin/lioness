import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import React from 'react'

import interpolate, { isTemplateVariable } from '../src/interpolate.js'

describe('interpolate() - strings', () => {
  it('returns the input string as is if it does not contain any variables', () => {
    const result = interpolate('wow')
    expect(result).toBe('wow')
  })

  it('replaces multiple variables correctly', () => {
    const result = interpolate('{{ name1 }} knows {{ name2 }}', {
      name1: 'Abdel',
      name2: 'Steph',
    })
    expect(result).toBe('Abdel knows Steph')
  })

  it('replaces multiple instances of the same variable correctly', () => {
    const result = interpolate(
      '{{ spam }}, {{ spam }}, {{ spam }} and {{ spam }}',
      { spam: 'spam' }
    )
    expect(result).toBe('spam, spam, spam and spam')
  })

  it('returns a template variable with an undefined value in its original form', () => {
    const result = interpolate('This behaviour is {{ und }}', {
      und: undefined,
    })
    expect(result).toBe('This behaviour is {{ und }}')
  })

  it('supports new lines in the passed string', () => {
    const result = interpolate('First row\nSecond row')
    expect(result).toBe('First row\nSecond row')
  })

  it('supports new lines in template variable values', () => {
    const slimShady = 'Hi my name is\nwhat\nmy name is\nwho\nmy name is'
    const result = interpolate(`{{ slimShady }}`, { slimShady })
    expect(result).toBe(slimShady)
  })

  it('safely injects non-string variables', () => {
    const result1 = interpolate('You have {{ swagCount }} swagger', {
      swagCount: 9,
    })
    expect(result1).toBe('You have 9 swagger')

    const result2 = interpolate('Is there coffee: {{ thereIsCoffee }}', {
      thereIsCoffee: true,
    })
    expect(result2).toBe('Is there coffee: true')

    const result3 = interpolate('Rich kids have {{ NaN }}nies', {
      NaN,
    })
    expect(result3).toBe('Rich kids have NaNnies')
  })
})

describe('interpolate() - components', () => {
  it('replaces a varible with a React element', async () => {
    const elem = interpolate('{{ thing }}', {
      thing: <span>Thing content</span>,
    })
    const { getByText } = await render(elem)
    await expect.element(getByText('Thing content')).toBeInTheDocument()
  })

  it('replaces multiple variables correctly', async () => {
    const elem = interpolate('{{ name1 }} knows {{ name2 }}', {
      name1: <span>Abdel</span>,
      name2: <em>Steph</em>,
    })
    const { getByRole, getByText } = await render(
      <div role="group">{elem}</div>
    )
    await expect
      .element(getByRole('group'))
      .toHaveTextContent('Abdel knows Steph')
  })

  it('replaces multiple instances of the same variable correctly', async () => {
    const elem = interpolate(
      '{{ spam }}, {{ spam }}, {{ spam }} and {{ spam }}',
      { spam: <span>spam</span> }
    )
    const { getByText } = await render(elem)
    await expect
      .element(getByText('spam, spam, spam and spam'))
      .toBeInTheDocument()
  })

  it('replaces a variable with a React element', async () => {
    const elem = interpolate('this is a line: {{ line }}', {
      line: <hr role="separator" />,
    })
    const { getByRole } = await render(elem)
    await expect.element(getByRole('separator')).toBeInTheDocument()
  })

  it('replaces a variable with a React element and injects content into it', async () => {
    const elem = interpolate('go to {{ link:this website }}', {
      link: <a role="link" href="http://website.com" />,
    })
    const { getByRole, getByText } = await render(elem)

    await expect.element(getByText('go to this website')).toBeInTheDocument()

    const link = getByRole('link')
    await expect.element(link).toBeInTheDocument()
    await expect.element(link).toHaveAttribute('href', 'http://website.com')
    await expect.element(link).toHaveTextContent('this website')
  })
})

describe('isTemplateVariable()', () => {
  it('works', () => {
    expect(isTemplateVariable('okay')).toBe(false)
    expect(isTemplateVariable('{okay}')).toBe(false)
    expect(isTemplateVariable('{{okay}}')).toBe(false)
    expect(isTemplateVariable('{{okay }}')).toBe(false)
    expect(isTemplateVariable('{{ okay}}')).toBe(false)

    expect(isTemplateVariable('{{ a }}')).toBe(true)
    expect(isTemplateVariable('{{ longerVarName }}')).toBe(true)
    expect(isTemplateVariable('{{ åäöπø¡ }}')).toBe(true)
    expect(isTemplateVariable('{{ key:value }}')).toBe(true)
    expect(isTemplateVariable('{{ key:value: }}')).toBe(true)
    expect(isTemplateVariable('{{ spaced key:with a spaced value }}')).toBe(
      true
    )
    expect(isTemplateVariable('{{ key:with\nnew\nlines }}')).toBe(true)
    expect(isTemplateVariable('{{ key:🚜 }}')).toBe(true)
  })
})
