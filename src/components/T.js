import React, { Component, PropTypes } from 'react';
import { withProps } from 'recompose';

import { withTranslators } from '../composers.js';
import * as contextTypes from '../contextTypes.js';

const T = ({ message, messagePlural, context, count, children, tpn, ...scope }) =>
  tpn(context, message || children.toString(), messagePlural, count, { ...scope, count });

export default withTranslators(T);
