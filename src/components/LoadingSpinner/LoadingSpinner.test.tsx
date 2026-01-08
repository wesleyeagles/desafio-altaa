import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("deve renderizar um LoadingSpinner com texto 'Carregando...'", () => {
    render(<LoadingSpinner label="Carregando..." />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
});
