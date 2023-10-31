export const calculatePrice = (products) => {
  const total = products.reduce(
    (acc, currentProduct) => acc + currentProduct.cost*currentProduct.quantityItem,
    0
  );
  return total.toFixed(2);
};
