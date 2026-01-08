import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("deve mostrar uma mensagem de aviso quando nenhum produto for encontrado", () => {
    render(<EmptyState message="Nenhum produto encontrado"  />);

    expect(screen.getByText("Nenhum produto encontrado")).toBeInTheDocument();
  });
});
