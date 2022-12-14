import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./App.css", () => "");

const defaultProps = {
  initialTasks: [
    { name: "kill bill", points: 6 },
    { name: "get shorty", points: 12 },
  ],
  onStateChange: jest.fn(),
};

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App {...defaultProps} />);
    expect(screen.getByText("TODO")).toBeInTheDocument();
  });

  it("renders the task names", () => {
    render(<App {...defaultProps} />);

    expect(screen.getByText("kill bill")).toBeInTheDocument();
    expect(screen.getByText("get shorty")).toBeInTheDocument();
  });

  it("sorts tasks by descending point value", () => {
    const { container } = render(<App {...defaultProps} />);

    const items = container.getElementsByTagName("li");

    expect(items[0]).toHaveTextContent("get shorty");
    expect(items[1]).toHaveTextContent("kill bill");
  });

  it("renders the correct class for the point threshold", () => {
    const { container } = render(<App {...defaultProps} />);

    const criticalItems = container.getElementsByClassName("critical");
    const normalItems = container.getElementsByClassName("normal");

    expect(criticalItems.length).toEqual(1);
    expect(normalItems.length).toEqual(1);

    expect(criticalItems[0]).toHaveTextContent("get shorty");
    expect(normalItems[0]).toHaveTextContent("kill bill");
  });

  it("parses point input in the task name", () => {
    const { container } = render(<App {...defaultProps} />);

    const items = container.getElementsByTagName("li");
    expect(items.length).toEqual(2);

    const input = container.getElementsByTagName("input")[0];
    fireEvent.change(input, { target: { value: "eat the frog 20pts" } });

    const submitButton = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(submitButton);

    expect(items.length).toEqual(3);

    const expectedItem = { name: "eat the frog", points: 20 };

    expect(defaultProps.onStateChange.mock.calls[0][0]).toContainEqual(
      expectedItem
    );
  });
});
