import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const defaultProps = {
  initialNewTask: "eat the frog 20pts",
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
  });

  it("parses point input in the task name", () => {
    const { container } = render(<App {...defaultProps} />);

    const items = container.getElementsByTagName("li");
    expect(items.length).toEqual(2);

    const submitButton = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(submitButton);

    expect(items.length).toEqual(3);

    const expectedOutput = [
      ...defaultProps.initialTasks,
      { name: "eat the frog", points: 20 },
    ];

    expect(defaultProps.onState).toBeCalledWith(
      expectedOutput,
      "eat the frog 20pts"
    );
  });
});
