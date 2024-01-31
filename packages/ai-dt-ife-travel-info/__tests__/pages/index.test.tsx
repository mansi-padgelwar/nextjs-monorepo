import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Home, {
  initialFlights,
  setInitialFlights,
  switchLanguage,
  handleLanguage,
} from "../../pages/index";
import { getServerSideProps } from "../../pages/index";
import * as HomeModule from "../../pages/index";
import userEvent from "@testing-library/user-event";

const mockInitialFlights = [
  {
    en: [
      {
        current_local_time: "12:00 PM",
        city: "New York",
        date: "2024-01-11",
        details: [{ title: "Flight 123", subtitle: "On time" }],
      },
    ],
    hi: [
      {
        current_local_time: "12:00 PM",
        city: "न्यूयॉर्क",
        date: "2024-01-11",
        details: [{ title: "फ्लाइट 123", subtitle: "समय पर" }],
      },
    ],
  },
];

it("fetches flights data from API and passes it as initialFlights prop", async () => {
  const mockContext = {
    req: {
      headers: {
        host: "localhost",
      },
    },
    locale: "en",
  };

  global.fetch = jest.fn(
    async () =>
      await Promise.resolve({
        json: async () =>
          await Promise.resolve([{ flightId: 1, flightName: "Flight 1" }]),
      })
  );

  const result = await getServerSideProps(mockContext);

  expect(global.fetch).toHaveBeenCalledWith(
    `http://${mockContext.req.headers.host}/api/flights`
  );
  expect(result.props.initialFlights).toEqual([
    { flightId: 1, flightName: "Flight 1" },
  ]);
});

test("initial language is set correctly", () => {
  const { getByTestId } = render(<Home initialFlights={{ en: [] }} />);
  expect(getByTestId("language")).toHaveTextContent("en");
});

test("changing language updates the displayed language", () => {
  const { getByTestId, getByText } = render(
    <Home initialFlights={{ en: [], hi: [], es: [] }} />
  );
  fireEvent.click(getByText("Hindi"));

  expect(getByTestId("language")).toHaveTextContent("hi");

  fireEvent.click(getByText("es"));
  expect(getByTestId("language")).toHaveTextContent("es");
});

test("flight information is rendered correctly for the selected language", async () => {
  const initialFlights = {
    en: [{ city: "New York", date: "2022-01-03", details: [] }],
    hi: [{ city: "न्यूयॉर्क", date: "2022-01-03", details: [] }],
    es: [{ city: "Nueva York", date: "2022-01-03", details: [] }],
  };

  render(<Home initialFlights={initialFlights} />);
  fireEvent.click(screen.getByText("Hindi"));
  const hindiText = await waitFor(() =>
    screen.getByTestId("flight-details-container1")
  );
  expect(hindiText).toBeTruthy();

  fireEvent.click(screen.getByText("es"));
  const spanishText = await waitFor(() =>
    screen.getByTestId("flight-details-container1")
  );
  expect(spanishText).toBeTruthy();
});

test("switchLanguage should set the selected language correctly", () => {
  const selectedLanguage = switchLanguage(mockInitialFlights, "hi");
  const expectedLanguage = [
    {
      city: "न्यूयॉर्क",
      current_local_time: "12:00 PM",
      date: "2024-01-11",
      details: [{ subtitle: "समय पर", title: "फ्लाइट 123" }],
    },
  ];
  expect(selectedLanguage).toEqual(expectedLanguage);
});

test("switchLanguage should return the correct flights for the selected language", () => {
  const selectedFlights = switchLanguage(mockInitialFlights, "en");
  const expectedFlights = mockInitialFlights[0].en;
  expect(selectedFlights).toEqual(expectedFlights);
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ en: [] }]),
  })
);

it("handles language click correctly", async () => {
  jest.mock("../../pages/index", () => ({
    ...HomeModule,
    setInitialFlights: jest.fn(),
  }));
  const { getByTestId, getByText } = render(
    <Home initialFlights={{ en: [] }} />
  );

  fireEvent.click(getByText("English"));
  // expect(setInitialFlights).toHaveBeenCalledWith([{ en: [] }]);
  expect(getByTestId("language").textContent).toBe("en");
});

it("renders FlightInformation component with correct props", () => {
  setInitialFlights(mockInitialFlights);
  jest.spyOn(window, "handleLanguage").mockImplementation(() => {});
  render(<Home initialFlights={mockInitialFlights} />);
  userEvent.click(screen.getByText("English"));
  const flightInformationComponent = screen.getByTestId(
    "flight-details-container1"
  );
  expect(flightInformationComponent).toBeInTheDocument();
});

test("handleLanguage function should set language and update selected flights", () => {
  const mockSetLanguage = jest.fn();
  const mockSetSelectedFlights = jest.fn();

  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn((initial) => [initial, mockSetLanguage]),
  }));

  const initialFlights = mockInitialFlights;
  const lang = "en";

  const mockSelectedFlights = [
    {
      current_local_time: "12:00 PM",
      city: "New York",
      date: "2024-01-11",
      details: [{ title: "Flight 123", subtitle: "On time" }],
    },
  ];

  const switchLanguageMock = jest.fn(() => mockSelectedFlights);

  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [lang, mockSetLanguage]);
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [initialFlights, mockSetSelectedFlights]);

  handleLanguage(lang, mockSetLanguage, initialFlights, mockSetSelectedFlights);

  expect(mockSetLanguage).toHaveBeenCalledWith(lang);
  expect(mockSetSelectedFlights).toHaveBeenCalledWith(mockSelectedFlights);
});


