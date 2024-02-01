import React from 'react'
import { render } from '@testing-library/react'
import FlightStatus from '@/components/FlightStatus/index'
import { type FlightInfo } from 'data/flights'

const sampleFlightData: FlightInfo[] = [
  {
    current_local_time: '12:00 PM',
    city: 'Sample City',
    date: 'Tue, 21st Nov',
    details: [{ title: 'Scheduled Departure', subtitle: '3:00 PM' }]
  }
]

describe('FlightStatus Component', () => {
  it('renders without crashing', () => {
    render(<FlightStatus flightData={sampleFlightData} />)
  })

  it('renders null if flightData is not provided or empty', () => {
    const { container } = render(<FlightStatus flightData={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders null if the first flight is not available', () => {
    const { container } = render(<FlightStatus flightData={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('displays the correct flight information', () => {
    const { getByText } = render(
      <FlightStatus flightData={sampleFlightData} />
    )
    expect(getByText('12:00 PM: 3pm')).toBeInTheDocument()
    expect(getByText('3:00 PM')).toBeInTheDocument()
  })

  it('renders nothing when no flight data is provided', () => {
    const { container } = render(<FlightStatus flightData={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
