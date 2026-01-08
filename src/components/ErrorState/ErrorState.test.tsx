import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("deve mostrar uma mensagem de erro", () => {
    render(<ErrorState message="Ocorreu um erro" onRetry={() => {}} />);

    expect(screen.getByText("Ocorreu um erro")).toBeInTheDocument();
  });
});
