import React, { PureComponent } from 'react'
import { wrapDisplayName } from 'recompose'

import { subscribe, unsubscribe } from './pubsub.js'

/**
 * Returns a HOC that triggers a re-render of itself whenever
 * a subscription notification is received.
 */
export default function forceUpdatedComponent(InputComponent) {
  class SubscribeUpdater extends PureComponent {
    state = {
      lastNotification: null,
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

  SubscribeUpdater.displayName = wrapDisplayName(InputComponent, 'forceUpdatedComponent')
  return SubscribeUpdater
}
