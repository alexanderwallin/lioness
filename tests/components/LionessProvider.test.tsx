import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, type RenderResult } from 'vitest-browser-react'

import LionessProvider from '../../src/components/LionessProvider.js'
import adapter from '../fixtures/adapter.js'
import messages from '../fixtures/messages.js'

const identity = (x: string): string => x
const identity2 = (x: string): string => x + x

function createApp(props = {}): React.ReactNode {
  return (
    <LionessProvider
      messages={messages}
      locale="en"
      adapter={adapter}
      transformInput={identity}
      {...props}
    >
      <div />
    </LionessProvider>
  )
}

describe('<LionessProvider />', () => {
  it('calls the adapter setup function', async () => {
    const setupSpy = vi.spyOn(adapter, 'setup')

    const app: RenderResult = await render(createApp())
    expect(setupSpy).toHaveBeenCalledExactlyOnceWith(messages, 'en')
  })

  it('it sets the Gettext locale (only) when the locale prop changes', async () => {
    const setLocaleSpy = vi.spyOn(adapter, 'setLocale')

    const app: RenderResult = await render(createApp())
    expect(setLocaleSpy).toHaveBeenCalledWith('en')

    await app.rerender(createApp({ transformInput: identity2 }))
    expect((setLocaleSpy.mock.lastCall as [string])[0]).toBe('en')

    await app.rerender(createApp({ locale: 'sv-SE' }))
    expect((setLocaleSpy.mock.lastCall as [string])[0]).toBe('sv-SE')
  })
})
