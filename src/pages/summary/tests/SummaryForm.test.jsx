import { fireEvent, render, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

test("checkbox enable button on first ckuck and disabled on second click", () => {
  render(<SummaryForm />);
  const checkBoxElement = screen.getByRole("checkbox", { name: /i agree to/i });
  const buttonElement = screen.getByRole("button", { name: /confirm order/i });

  expect(checkBoxElement).not.toBeChecked();

  fireEvent.click(checkBoxElement);
  expect(buttonElement).toBeEnabled();

  fireEvent.click(checkBoxElement);
  expect(buttonElement).toBeDisabled();
});
