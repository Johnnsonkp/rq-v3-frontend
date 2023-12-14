import { render, screen } from "@testing-library/react";
import App from "./App";
import LongResponse from "./LongResponse";
import SingleQuestion from "./SingleQuestion";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("React Quiz");
  expect(linkElement).toBeInTheDocument();
});

test("Checks that question mode option is visible on the nav", () => {
  render(<App />);
  const linkElement = screen.getByText("Question Mode");
  expect(linkElement).toBeInTheDocument();
});

test("checks that score is visible on the nav", () => {
  render(<App />);
  const linkElement = screen.getByText("Score: 0");
  expect(linkElement).toBeInTheDocument();
});

test("Checks if single mode is fetching a single question card item", () => {
  render(<SingleQuestion />);
  const linkElement = screen.getByRole("button", { name: "Next" });
  expect(linkElement).toBeInTheDocument();
});

test("Checks that long response mode fetches a single question card item", () => {
  render(<LongResponse />);
  const linkElement = screen.getByRole("button", { name: "Submit" });
  expect(linkElement).toBeInTheDocument();
});
