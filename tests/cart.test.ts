import { describe, expect, it, beforeEach } from "vitest";
import { addProduct, removeProduct, getProductCount, getTotal, applyDiscount, clearCart, Product } from "../src/cart";

describe("cart module", () => {
  beforeEach(() => {
    clearCart();
  });

  it("Ajouter un produit", () => {
    const product: Product = { id: "1", name: "Product 1", price: 10, quantity: 1 };
    
    addProduct(product);
    expect(getProductCount()).toBe(1);
    
  });

  it("Ajouter un produit qui existe deja", () => {
    const product: Product = { id: "1", name: "Product 1", price: 10, quantity: 1 };
    
    addProduct(product);
    addProduct(product);
    expect(getProductCount()).toBe(1);
    
  });

  it("Supprimer un produit", () => {
    const product: Product = { id: "1", name: "Product 1", price: 10, quantity: 1 };
    
    addProduct(product);
    removeProduct(product.id);
    expect(getProductCount()).toBe(0);
    
  });



  it("Calculer le nombre de produits", () => {
    const product1: Product = { id: "1", name: "Product 1", price: 10, quantity: 1 };
    const product2: Product = { id: "2", name: "Product 2", price: 20, quantity: 2 };
    
    addProduct(product1);
    addProduct(product2);

    expect(getProductCount()).toBe(2);
    
  });

  it("Calculer le total", () => {
    const product1: Product = { id: "1", name: "Product 1", price: 10, quantity: 1 };
    const product2: Product = { id: "2", name: "Product 2", price: 20, quantity: 2 };
    
    addProduct(product1);
    addProduct(product2);
    expect(getTotal()).toBe(50);
    
  });

  it("Appliquer une remise valide", () => {
    const product: Product = { id: "1", name: "Product 1", price: 100, quantity: 1 };
    
    addProduct(product);
    const initialTotal = getTotal();
    applyDiscount("DISCOUNT10");
    expect(getTotal()).toBe(initialTotal - (initialTotal * 0.1));
    
  });

  it("Appliquer une remise invalide", () => {
    const product: Product = { id: "1", name: "Product 1", price: 100, quantity: 1 };
    
    addProduct(product);
    const initialTotal = getTotal();
    applyDiscount("INVALID");
    expect(getTotal()).toBe(initialTotal);
  });

  it("Valider un produit avec des valeurs négatives", () => {
    const invalidProduct: Product = { id: "1", name: "Product 1", price: -10, quantity: 1 };
    
    expect(() => {
      addProduct(invalidProduct);
    }).toThrow();
    
  });

  it("Valider un produit avec une quantité nulle", () => {
    const invalidProduct: Product = { id: "1", name: "Product 1", price: 10, quantity: 0 };
    
    expect(() => {
      addProduct(invalidProduct);
    }).toThrow();
    
  });
});