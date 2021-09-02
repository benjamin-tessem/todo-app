import { render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";
import { act } from "react-dom/test-utils";

const fakeTodo = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
];

describe("App", () => {
  describe("No Data", () => {
    it("Should display error", async () => {
      jest.spyOn(global, "fetch").mockImplementation(
        () =>
          Promise.resolve({
            json: () => Promise.reject(new Error("Failed to Fetch")),
          }) as Promise<Response>
      );

      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        render(<App />);
      });

      const errorText = screen.getByText(/Error: Failed to Fetch/i);
      expect(errorText).toBeInTheDocument();
    });
  });
  describe("Provided Data", () => {
    it("should display data", async () => {
      jest.spyOn(global, "fetch").mockImplementation(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(fakeTodo),
          }) as Promise<Response>
      );
      await act(async () => {
        render(<App />);
      });
      const buttons = await screen.findAllByRole("button");
      const listItems = await screen.findAllByRole("listitem");
      expect(buttons.length).toBe(2);
      expect(listItems.length).toBe(1);
    });
  });
});
