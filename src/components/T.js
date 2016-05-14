import React, { Component, PropTypes } from 'react';
import { withProps } from 'recompose';

import { withTranslators } from '../composers.js';
import * as contextTypes from '../contextTypes.js';

const T = ({ message, children, t, ...scope }) =>
  <span {...scope}>{t(message || children.toString(), scope)}</span>;

export default withTranslators(T);
