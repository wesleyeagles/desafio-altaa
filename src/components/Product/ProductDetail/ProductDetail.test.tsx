import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockProductSingle } from "../../../mocks/product.mock";
import ProductDetail from "./ProductDetail";
import { CartProvider } from "../../../contexts/CartContext";

describe("ProductDetail", () => {
  it("deve renderizar corretamente o ProductDetail", () => {
    render(<CartProvider><ProductDetail product={mockProductSingle} onClose={() => {}} /></CartProvider>);

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("R$ 99.99")).toBeInTheDocument();
  });
});