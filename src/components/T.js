import React, { Component, PropTypes } from 'react';
import { withProps } from 'recompose';

import { withLocalization } from '../composers.js';
import * as contextTypes from '../contextTypes.js';

const T = ({ message, t, ...scope }) =>
  <span {...scope}>{t(message, scope)}</span>;

export default withLocalization(T);
