exports.Category = {
  products: (parent, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
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
