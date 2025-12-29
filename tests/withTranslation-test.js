/* eslint-env mocha */
/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'

import withTranslation from '../src/withTranslation.js'
import LionessProvider from '../src/components/LionessProvider.js'

chai.use(chaiEnzyme())

describe('withTranslation()', () => {
  it('passes locale and translators from the context to a Component as props', () => {
    const MyComponent = withTranslation((...props) => <span {...props} />)
    const app = mount(
      <LionessProvider messages={{}} locale="en" adapter={() => ({})}>
        <div>
          <MyComponent />
        </div>
      </LionessProvider>
    )
    expect(app.find('span').props()['0']).to.contain.all.keys([
      'locale',
      'messages',
      'transformInput',
      't',
    ])
  })
})
