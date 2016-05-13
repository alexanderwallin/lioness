import React, { Component, PropTypes } from 'react';

import * as contextTypes from '../contextTypes.js';

const propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

class T extends Component {
  render() {
    const { message, className, ...scope } = this.props;
    const { t } = this.context;

    return <span className={className}>{ t(message, scope) }</span>;
  }
}

T.propTypes = propTypes;
T.contextTypes = { ...contextTypes };
T.defaultProps = defaultProps;

export default T;
