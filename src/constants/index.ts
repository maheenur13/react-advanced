import type { Product } from "../types";

// Expensive function to demonstrate React Compiler optimization
// Without React Compiler, this would need useMemo to prevent recalculation on every render
export function expensiveFunction(): number {
  console.log("🔥 Expensive function called!");
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
}

// Expensive calculation for product filtering
export function filterProducts(
  products: Product[],
  searchTerm: string
): Product[] {
  console.log("🔍 Filtering products...");
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Expensive sorting operation
export function sortProducts(products: Product[], sortBy: string): Product[] {
  console.log("📊 Sorting products...");
  const sorted = [...products];
  if (sortBy === "price-asc") {
    return sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    return sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    return sorted.sort((a, b) => b.rating - a.rating);
  }
  return sorted;
}
