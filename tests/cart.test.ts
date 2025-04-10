import { describe, expect, it } from "vitest";

describe("cart module", () => {
  it("should add a product to the cart", () => {
    // écrire le test ici
    expect(true).toBe(true);
  });
});

// TODO : ajouter d'autres tests pour le module cart

//test pour l'ajout d'un produit
it("should add a product to the cart", () => {
  const cart = [];
  const product = { id: 1, name: "Product 1", price: 10 };
  cart.push(product);
  expect(cart).toEqual([product]);
});

