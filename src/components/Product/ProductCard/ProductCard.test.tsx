import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductCard from "./ProductCard";
import { mockProductSingle } from "../../../mocks/product.mock";

describe("ProductCard", () => {
  it("deve renderizar corretamente o ProductCard", () => {
    render(<ProductCard product={mockProductSingle} onClick={() => {}} />);

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("R$ 99.99")).toBeInTheDocument();
  });
});