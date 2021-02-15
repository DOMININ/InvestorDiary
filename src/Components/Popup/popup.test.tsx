import { render, screen } from "@testing-library/react";
import Popup from "./popup";
import { BrowserRouter } from "react-router-dom";

describe("Popup", () => {
  it("renders Popup component", () => {
    render(
      <BrowserRouter>
        <Popup />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Успешно")).toHaveAttribute("src");
    expect(
      screen.getByText(/Регистрация прошла успешно!/i)
    ).toBeInTheDocument();
  });
});
