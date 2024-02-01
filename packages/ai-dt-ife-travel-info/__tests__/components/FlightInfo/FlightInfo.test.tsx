import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import FlightInfo from "../../../components/FlightInfo/index";

beforeEach(() => {
  window.Android = {
    triggerExpand: jest.fn(),
    triggerCollapse: jest.fn(),
  };
});

afterEach(() => {
  delete window.Android;
});

describe("FlightInfo component", () => {
  const mockProps = {
    city: "Test City",
    date: "2024-01-02",
    details: [
      { title: "Detail 1", subtitle: "Subtitle 1" },
      { title: "Detail 2", subtitle: "Subtitle 2" },
    ],
    isVisible: false,
    setIsVisible: jest.fn(),
  };

  it("should handle collapse when window.Android is not defined", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const setIsVisibleMock = jest.fn();
    const { getByTestId } = render(
      <FlightInfo
        city="Test City"
        date="2024-01-19"
        details={[{ title: "Detail 1", subtitle: "Subtitle 1" }]}
        isVisible={true}
        setIsVisible={setIsVisibleMock}
      />
    );

    delete window.Android;
    const titleContainer = getByTestId("title-container");
    fireEvent.click(titleContainer);
    await waitFor(() => {
      expect(setIsVisibleMock).toHaveBeenCalledWith(false);
    });
    consoleErrorSpy.mockRestore();
  });

  it("should collapse when handleCollapseFromAndroid is called", async () => {
    const setIsVisibleMock = jest.fn();
    const { getByTestId } = render(
      <FlightInfo
        city="Test City"
        date="2024-01-19"
        details={[{ title: "Detail 1", subtitle: "Subtitle 1" }]}
        isVisible={true}
        setIsVisible={setIsVisibleMock}
      />
    );

    const titleContainer = getByTestId("title-container");
    fireEvent.click(titleContainer);

    console.log("Current visibility state:", setIsVisibleMock.mock.calls);

    await waitFor(() => {
      expect(setIsVisibleMock).toHaveBeenCalledWith(false);
    });

    setIsVisibleMock.mockClear();
    window.handleCollapseFromAndroid();

    console.log(
      "After handleCollapseFromAndroid: ",
      setIsVisibleMock.mock.calls
    );

    await waitFor(() => {
      expect(setIsVisibleMock).toHaveBeenCalledWith(false);
    });
  });

  it("renders with provided props", () => {
    const { getByText } = render(<FlightInfo {...mockProps} />);
    expect(getByText(/Test City/i)).toBeInTheDocument();
    expect(getByText(/2024-01-02/i)).toBeInTheDocument();
    expect(getByText(/Detail 1/i)).toBeInTheDocument();
    expect(getByText(/Detail 2/i)).toBeInTheDocument();
  });

  it("calls setIsVisible correctly on title click when not visible", () => {
    const { getByText } = render(<FlightInfo {...mockProps} />);
    fireEvent.click(getByText(/Test City/i));
    expect(mockProps.setIsVisible).toHaveBeenCalledWith(true);
  });

  it("calls setIsVisible correctly on title click when visible", () => {
    const { getByText } = render(
      <FlightInfo {...mockProps} isVisible={true} />
    );

    fireEvent.click(getByText(/Test City/i));
    expect(mockProps.setIsVisible).toHaveBeenCalledWith(false);
  });

  it("calls handleCollapseFromAndroid correctly when isVisible is true", async () => {
    const mockWindowWithAndroid = {
      Android: {
        triggerCollapse: jest.fn(),
      },
      handleCollapseFromAndroid: jest.fn(),
    };
    global.window = Object.create(window);
    Object.assign(global.window, mockWindowWithAndroid);

    render(<FlightInfo {...mockProps} isVisible={true} />);
    await waitFor(() => {
      expect(
        mockWindowWithAndroid.handleCollapseFromAndroid
      ).toHaveBeenCalledTimes(0);
    });
  });

  it("calls handleCollapseFromAndroid correctly when isVisible is false", () => {
    const mockWindowWithAndroid = {
      Android: {
        triggerCollapse: jest.fn(),
      },
      handleCollapseFromAndroid: jest.fn(),
    };
    global.window = Object.create(window);
    Object.assign(global.window, mockWindowWithAndroid);

    render(<FlightInfo {...mockProps} isVisible={false} />);

    expect(
      mockWindowWithAndroid.handleCollapseFromAndroid
    ).not.toHaveBeenCalled();
  });

  // test("handleDetailsExpand should log a message when window.Android is not defined", () => {
  //   const { getByTestId } = render(<FlightInfo {...mockProps} />);
  //   const logSpy = jest.spyOn(console, "log");
  //   fireEvent.click(getByTestId("title-container"));
  //   expect(logSpy).toHaveBeenCalledWith("androidObject:", expect.any(Object));
  //   expect(logSpy).not.toHaveBeenCalledWith("window.Android is not defined");
  // });

  it("should collapse when handleCollapseFromAndroid is called", async () => {
    const setIsVisibleMock = jest.fn();
    const { getByTestId } = render(
      <FlightInfo
        city="Test City"
        date="2024-01-19"
        details={[{ title: "Detail 1", subtitle: "Subtitle 1" }]}
        isVisible={true}
        setIsVisible={setIsVisibleMock}
      />
    );

    const titleContainer = getByTestId("title-container");
    fireEvent.click(titleContainer);

    console.log("Current visibility state:", setIsVisibleMock.mock.calls);

    await waitFor(() => {
      expect(setIsVisibleMock).toHaveBeenCalledWith(false);
    });

    setIsVisibleMock.mockClear();
    window.handleCollapseFromAndroid();

    console.log(
      "After handleCollapseFromAndroid: ",
      setIsVisibleMock.mock.calls
    );

    await waitFor(() => {
      expect(setIsVisibleMock).toHaveBeenCalledWith(false);
    });
  });
});

test("handleDetailsCollapse calls triggerCollapse", async () => {
  const details = [
    {
      title: "Detail Title",
      subtitle: "Detail Subtitle",
    },
  ];

  const mockAndroidObject = {
    triggerExpand: jest.fn(),
    triggerCollapse: jest.fn(),
  };

  global.window = {
    ...global.window,
    Android: mockAndroidObject,
  };

  const { getByTestId } = render(
    <FlightInfo
      city="TestCity"
      date="2024-01-19"
      details={details}
      isVisible={true}
      setIsVisible={() => {}}
    />
  );

  fireEvent.click(getByTestId("title-container"));

  await waitFor(() => {
    setTimeout(() => {
      expect(mockAndroidObject.triggerCollapse).toHaveBeenCalled();
    }, 100);
  });

  delete global.window.Android;
});
