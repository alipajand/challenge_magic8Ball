import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { act, render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

function mockFetchJson(body: unknown, status = 200): Promise<Response> {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response)
}

describe('App', () => {
  it('should render required test attributes', () => {
    render(<App />)

    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('shake-button')).toBeInTheDocument()
    expect(screen.getByTestId('shake-status')).toBeInTheDocument()
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByTestId('answer-display')).toBeInTheDocument()
    expect(screen.getByTestId('answer-text')).toBeInTheDocument()
  })

  it('should require email before calling the API', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    render(<App />)
    fireEvent.click(screen.getByTestId('shake-button'))

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter your email.')
  })

  it('should type the answer on success', async () => {
    vi.useFakeTimers()
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => mockFetchJson({ secret: 'QUANTUM-PICKLE' }))

    render(<App />)
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'candidate@example.com' } })
    fireEvent.click(screen.getByTestId('shake-button'))

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByTestId('shake-status')).toHaveTextContent('Done')

    await act(async () => {
      vi.advanceTimersByTime('QUANTUM-PICKLE'.length * 80)
    })

    expect(screen.getByTestId('answer-text')).toHaveTextContent('QUANTUM-PICKLE')
  })

  it('should show an error on failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => mockFetchJson({ error: 'Nope' }, 500))

    render(<App />)
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'candidate@example.com' } })
    fireEvent.click(screen.getByTestId('shake-button'))

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByTestId('shake-status')).toHaveTextContent('Error')
    expect(screen.getByTestId('error-message')).toHaveTextContent('Nope')
  })
})
