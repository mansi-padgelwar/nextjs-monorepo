import React from 'react'
import { render, screen } from '@testing-library/react'
import FlightDetails from '@/components/FlightDetails'

describe('FlightDetails component', () => {
  const mockDetails = [
    { title: 'Departure', subtitle: '10:00 AM' },
    { title: 'Arrival', subtitle: '12:00 PM' }
  ]

  it('renders without crashing', () => {
    render(<FlightDetails details={mockDetails} />)
    expect(screen.getByTestId('flight-details-container')).toBeInTheDocument()
  })

  it('renders custom components for each detail', () => {
    render(<FlightDetails details={mockDetails} />)

    mockDetails.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('renders correct subtitles for each detail', () => {
    render(<FlightDetails details={mockDetails} />)

    mockDetails.forEach(({ subtitle }) => {
      expect(screen.getByText(subtitle)).toBeInTheDocument()
    })
  })
})
