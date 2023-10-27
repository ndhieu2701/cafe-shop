export const customPagination = (page, pageSize, products) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const newProducts = products.slice(startIndex, endIndex);
  return newProducts;
};
