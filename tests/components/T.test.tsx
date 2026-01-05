import React, { type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

import { LionessProvider, T } from '../../src/index.js'
import type {
  Adapter,
  AdapterTranslateParams,
  InterpolationScope,
  Locale,
  MessageSet,
} from '../../src/types.js'

import adapter from '../fixtures/adapter.js'
import messages from '../fixtures/messages.js'

// Mock the t() function
const mockTi = vi.fn(
  (payload: AdapterTranslateParams, scope: InterpolationScope): string =>
    payload.one
)

vi.mock('../../src/useTranslation.js', () => ({
  default: () => ({
    ti: mockTi,
  }),
}))

type TArgs = [payload: AdapterTranslateParams, scope: InterpolationScope]

const identity = vi.fn((x: string): string => x)

// Reusable app component
interface AppProps {
  children: ReactNode
}

function App({ children }: AppProps) {
  return (
    <LionessProvider
      messages={messages}
      locale="en"
      adapter={adapter}
      transformInput={identity}
    >
      <div>{children}</div>
    </LionessProvider>
  )
}

describe('<T />', () => {
  beforeEach(() => {
    mockTi.mockClear()
  })

  it('passes translation props to t()', async () => {
    const app = await render(
      <App>
        <div role="article">
          <T one="Singular" other="Plural" context="Test" count={123} />
        </div>
      </App>
    )
    expect(mockTi).toHaveBeenCalled()
    expect((mockTi.mock.lastCall as TArgs)[0]).toEqual({
      one: 'Singular',
      other: 'Plural',
      context: 'Test',
      count: 123,
    })
  })

  it('passes rest props as interpolation scope', async () => {
    const date = new Date()
    const app = await render(
      <App>
        <div role="article">
          <T prop1={123} prop2={date}>
            {'Singular {{ prop1 }} {{ prop2 }}'}
          </T>
        </div>
      </App>
    )
    expect(mockTi).toHaveBeenCalled()
    expect((mockTi.mock.lastCall as TArgs)[1]).toEqual({
      prop1: 123,
      prop2: date,
    })
  })

  it('accepts children as input message', async () => {
    const app = await render(
      <App>
        <div role="article">
          <T prop1={123} prop2="456">
            wow
          </T>
        </div>
      </App>
    )
    expect(mockTi).toHaveBeenCalled()
    expect((mockTi.mock.lastCall as TArgs)[0].one).toBe('wow')
    expect((mockTi.mock.lastCall as TArgs)[1]).toEqual({
      prop1: 123,
      prop2: '456',
    })
  })

  it('includes count in interpolation scope', async () => {
    const app = await render(
      <App>
        <div role="article">
          <T one="One thing" other="{{ num }} things" count={2} />
        </div>
      </App>
    )
    expect(mockTi).toHaveBeenCalled()
    expect((mockTi.mock.lastCall as TArgs)[1].count).toBe(2)
  })
})
