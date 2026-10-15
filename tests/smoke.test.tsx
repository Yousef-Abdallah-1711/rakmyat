import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

function SmokeComponent() {
  return <div>Rakmyat test foundation</div>
}

describe('React Testing Library setup', () => {
  it('renders a component and reads its text', () => {
    render(<SmokeComponent />)

    expect(screen.getByText('Rakmyat test foundation')).toBeTruthy()
  })
})
