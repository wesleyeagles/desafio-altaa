import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockProductSingle } from "../../../mocks/product.mock";
import ProductDetail from "./ProductDetail";

describe("ProductDetail", () => {
  it("deve renderizar corretamente o ProductDetail", () => {
    render(<ProductDetail product={mockProductSingle} onClose={() => {}} />);

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });
});