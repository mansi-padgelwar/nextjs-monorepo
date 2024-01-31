/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen} from '@testing-library/react'
import Home, { getServerSideProps } from '@/pages/index'
import React from 'react';

const mockFlightInfo = {
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

test('renders Home component', () => {
  render(<Home/>);

});
test('renders "pair your earphone" test',async ()=>{
  render (<Home/>)
  expect(screen.getByTestId('device-wrapper')).toHaveClass('pairEPText');
  expect(screen.getByText(/^Pair Your Earphone$/)).toBeInTheDocument();  
  

})
test('open the wrapper on click', () => {
  const { getByText } = render(<Home />);
  fireEvent.click(getByText(/^Pair Your Earphone$/)); 
  expect(screen.getByTestId('device-wrapper')).toHaveClass('pairEPText','pairEPTextHide');

});
test('opening the wrapper shows "waiting to pair" text',()=>{
  const { getByText } = render(<Home />);
  fireEvent.click(getByText(/^Waiting to Pair Your Earphone$/)); 


})

test('close the wrapper on click', () => {
  const { getByText } = render(<Home />);
  fireEvent.click(getByText('Close')); 
  expect(screen.getByTestId('close-btn')).toHaveClass('closeWrapperBtnHide');

});

test('render bluthooth image',()=>{
  render (<Home/>)

const bthImg=screen.getByAltText("bluetooth") as HTMLImageElement
expect(bthImg).toBeInTheDocument()
expect(bthImg.src).toContain(encodeURIComponent('/images/Bluetooth.png'))
expect(bthImg.width).toBe(60)
expect(bthImg.height).toBe(60)

})
test('render earphone image',()=>{
  render (<Home/>)

const ephnImg=screen.getByAltText("earphone") as HTMLImageElement
expect(ephnImg).toBeInTheDocument()
expect(ephnImg.src).toContain(encodeURIComponent('/images/earphone.png'))
expect(ephnImg.width).toBe(50)
expect(ephnImg.height).toBe(50)

})
window.Android = {
  triggerOverlayOpen: jest.fn(), 
  triggerOverlayClose: jest.fn(),
   
};
describe('home', () => {
  it('should trigger overlay open on transition end', () => {
    
    // Arrange
    const { getByTestId } = render(<Home />);
    const deviceWrapper = getByTestId('device-wrapper');

    // Act
    fireEvent.transitionEnd(deviceWrapper);

    // Assert
    expect(window.Android.triggerOverlayOpen).toHaveBeenCalled();
  });

  it('should call triggerOverlayClose on transition end', () => {

    // Render the component with handleTransitionEnd
    const { container } = render(<Home openDeviceWrapper={false} />);

    const divElement = container.querySelector('div') as HTMLElement; 
    fireEvent.transitionEnd(divElement);

    // Assert that window.Android.triggerOverlayClose was called
    expect(window.Android.triggerOverlayClose).toHaveBeenCalled();
  });
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
      };
     
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([mockFlightInfo]),
        })
      ) as jest.Mock;
      const result = await getServerSideProps(mockContext);
   
    expect(global.fetch).toHaveBeenCalledWith(
      `http://${mockContext.req.headers.host}/api/getflightInfo`
    );
    expect(result.props.flightInfo).toEqual([
      mockFlightInfo,
    ]);
    });

});





