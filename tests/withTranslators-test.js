/* eslint-env mocha */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'

import withTranslators from '../src/withTranslators.js'
import LionessProvider from '../src/components/LionessProvider.js'

chai.use(chaiEnzyme())

describe('withTranslators()', () => {
  it('passes locale and translators from the context to a Component as props', () => {
    const MyComponent = withTranslators((...props) => <span {...props} />)
    const app = mount(
      <LionessProvider messages={{}} locale="en">
        <div>
          <MyComponent />
        </div>
      </LionessProvider>
    )
    expect(app.find('span').props()['0']).to.contain.all.keys(['locale', 't', 'tn', 'tp', 'tnp', 'tc', 'tcn', 'tcp', 'tcnp'])
  })

  it('sets displayName', () => {
    const MyComponent = (...props) => <span {...props} />
    MyComponent.displayName = 'MyComponent'

    expect(withTranslators(MyComponent).displayName).to.equal('withTranslators(MyComponent)')
  })
})
