import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TicketDetails from '../../pages/index'
import {getServerSideProps} from '../../pages/index'
import { FlightInfo } from "../../reusable-types/flightInfo";
import languages from '../../data/languages.json';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring'

const mockFlightInfo: FlightInfo = {
        "carrierCode": "AI",
        "flightNumber": "173",
        "origin": "DEL",
        "destination": "SFO",
        "originAirPortName": "New Delhi",
        "destinationAirPortName": "San Fransisco",
        "totalJourneyTime": "15h 30m",
        "scheduledDepartureDate": "21-NOV-2023",
        "scheduledArrivalDate": "21-NOV-2023",
        "scheduledDepartureTime": "04:00",
        "scheduledDepartureTerminal": "3",
        "scheduledDepartureGate": "23A",
        "scheduledArrivalTime": "06:00",
        "scheduledArrivalTerminal": "1" 
}


test('Check TicketDetails rendering or not', ()=>{
  render(<TicketDetails flightInfo={mockFlightInfo}/>)
})


test('Renders seat information', () => {
  render(<TicketDetails flightInfo={mockFlightInfo}/>)
  expect(screen.getByText(`${mockFlightInfo?.carrierCode} ${mockFlightInfo?.flightNumber}`)).toBeInTheDocument();
  expect(screen.getByText('12 A')).toBeInTheDocument();
  expect(screen.getByText(languages.en.business)).toBeInTheDocument();
})



test('renders image correctly', () => {
  render(<TicketDetails  flightInfo={mockFlightInfo}/>); // Render your component

  const imageElement = screen.getByAltText('Seat Image') as HTMLImageElement

  expect(imageElement).toBeInTheDocument();
  expect(imageElement?.src).toContain(('/images/seat.png'));
  expect(imageElement.style.width).toBe('1em');
});

test('renders favicon image', () => {
  render(<TicketDetails  flightInfo={mockFlightInfo}/>); // Render your component

  const imageElement = screen.getByAltText('Seat Image') as HTMLImageElement
  
  expect(imageElement).toBeInTheDocument();
  expect(imageElement?.src).toContain(('/images/seat.png'));
  expect(imageElement.style.width).toBe('1em');
});

describe('getServerSideProps', () => {
  it('should expose a function', () => {
		expect(getServerSideProps).toBeDefined();
	});
  
  it('getServerSideProps should return expected output', async () => {
    const mockContext = {
      req: {
        headers: {
          host: "localhost",
        },
      },
      locale: "en",
    } as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
   
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockFlightInfo]),
      })
    ) as jest.Mock;

    const result = await getServerSideProps(mockContext) 
 
    expect(global.fetch).toHaveBeenCalledWith(
      `http://${mockContext.req.headers.host}/api/getflightInfo`
    );

    expect(result.props.flightInfo as any).toEqual([
      mockFlightInfo,
    ]);
  });
  
});

