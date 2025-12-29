import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isRequiredIf from 'react-proptype-conditional-require'

import withTranslation from '../withTranslation.js'

const messagePropType = (otherPropName) => {
  return isRequiredIf(
    PropTypes.string,
    (props) => !props[otherPropName],
    `T requires either a message prop or a child node in the form of a pure string`
  )
}

class T extends PureComponent {
  static propTypes = {
    message: messagePropType('children'),
    children: messagePropType('messages'),
    messagePlural: PropTypes.string,
    context: PropTypes.string,
    count: PropTypes.number,
    t: PropTypes.func.isRequired,
    transformInput: PropTypes.func.isRequired,
  }

  static defaultProps = {
    message: null,
    children: null,
    messagePlural: null,
    context: '',
    count: 1,
  }

  render() {
    const {
      message,
      messagePlural,
      context,
      count,
      children,
      t,
      transformInput,
      ...scope
    } = this.props

    const msgid = message || children || ''
    const translatedContent = t({
      context,
      message: transformInput(msgid),
      messagePlural: transformInput(messagePlural),
      count,
      scope: {
        ...scope,
        count,
      },
    })

    return <>{translatedContent}</>
  }
}

export default withTranslation(T)
