import { render, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

test("checkbox enable button on first ckuck and disabled on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkBoxElement = screen.getByRole("checkbox", { name: /i agree to/i });
  const buttonElement = screen.getByRole("button", { name: /confirm order/i });

  expect(checkBoxElement).not.toBeChecked();

  await user.click(checkBoxElement);
  expect(buttonElement).toBeEnabled();

  await user.click(checkBoxElement);
  expect(buttonElement).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // poppver appers on mouseover of checkjbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disapeer when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
