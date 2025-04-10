export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const products: Product[] = [];

let discountPercentage = 0;

const validDiscountCodes: Record<string, number> = {
  "DISCOUNT10": 10,
  "DISCOUNT20": 20,
  "DISCOUNT50": 50
};

export function clearCart(): void {
  products.length = 0;
  discountPercentage = 0;
}

function validateProduct(product: Product): void {
  if (!product.id || product.id.trim() === "") {
    throw new Error("L'identifiant du produit ne peut pas être vide");
  }
  
  if (!product.name || product.name.trim() === "") {
    throw new Error("Le nom du produit ne peut pas être vide");
  }
  
  if (product.price <= 0) {
    throw new Error("Le prix du produit doit être supérieur à zéro");
  }
  
  if (product.quantity <= 0) {
    throw new Error("La quantité du produit doit être supérieure à zéro");
  }
}


export function addProduct(product: Product): void {
  validateProduct(product);
  
  const produitExistant = products.findIndex(p => p.id === product.id);
  
  if (produitExistant >= 0) {
    products[produitExistant].quantity += product.quantity;
  } else {
    products.push({ ...product });
  }
}


export function removeProduct(productId: string): void {
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return; 
  }
  
  products.splice(productIndex, 1);
}

export function getProductCount(): number {
  return products.length;
}

export function getTotal(): number {
  const subtotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
  
  if (discountPercentage > 0) {
    return subtotal * (1 - discountPercentage / 100);
  }
  
  return subtotal;
}



export function applyDiscount(code: string): void {
  discountPercentage = validDiscountCodes[code];
}
