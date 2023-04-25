exports.Category = {
  products: (parent, { filter }, { products }) => {
    const categoryProducts = products.filter(
      (product) => product.categoryId === parent.id
    );

    let categoryFilterProducts = categoryProducts;

    if (filter && filter.onSale) {
      categoryFilterProducts = filterProducts.filter(
        (product) => product.onSale
      );
    }

    return categoryFilterProducts;
  },
};
