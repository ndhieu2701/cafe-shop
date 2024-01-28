export const filterProductByID = (products, productIDs) => {
  const productsMap = new Map();
  for (const product of products) {
    productsMap.set(product._id, product);
  }

  const filterProducts = [];

  for (const productID of productIDs) {
    if (productsMap.has(productID)) {
      filterProducts.push(productsMap.get(productID));
    }
  }
  return filterProducts;
};
