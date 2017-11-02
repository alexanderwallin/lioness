import React, { PureComponent } from 'react'
import { wrapDisplayName } from 'recompose'

import { subscribe, unsubscribe } from './pubsub.js'

/**
 * Returns a HOC that triggers a re-render of itself whenever
 * a subscription notification is received.
 */
export default function forceUpdatedComponent(InputComponent) {
  class SubscribeUpdater extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        lastNotification: null,
      }
    }

    componentDidMount() {
      subscribe(this.handleNotification.bind(this))
    }

    componentWillUnmount() {
      unsubscribe(this.handleNotification)
    }

    handleNotification() {
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
