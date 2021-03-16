/* eslint react/no-unused-state: 0 */
/* eslint react/jsx-props-no-spreading: 0 */
import React, { PureComponent } from 'react'
import { wrapDisplayName } from 'recompose'

import { subscribe, unsubscribe } from './pubsub.js'

/**
 * Returns a HOC that triggers a re-render of itself whenever
 * a subscription notification is received.
 */
export default function forceUpdatedComponent(InputComponent) {
  return class SubscribeUpdater extends PureComponent {
    static displayName = wrapDisplayName(
      InputComponent,
      'forceUpdatedComponent'
    )

    constructor(props) {
      super(props)
      this.state = {
        lastNotification: null,
      }
    }

    componentDidMount() {
      subscribe(this.handleNotification)
    }

    componentWillUnmount() {
      unsubscribe(this.handleNotification)
    }

    handleNotification = () => {
      this.setState({
        lastNotification: Date.now(),
      })
    }

    render() {
      return <InputComponent {...this.props} />
    }
  }
}
