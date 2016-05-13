import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import { LionessProvider, T } from '../src';
const messages = require('./fixtures/messages.json');

chai.use(chaiEnzyme());

describe('context', () => {
  describe('provider', () => {
    it('should provide a child context', () => {
      const wrapper = shallow(
        <LionessProvider locale="en" messages={messages}>
          <T message="hello" />
        </LionessProvider>
      );

      console.log('html:', wrapper.html());

      expect(wrapper.find(T)).to.have.length(1);
      expect(wrapper.find(T)).to.contain('hello');
    });
  });
});
