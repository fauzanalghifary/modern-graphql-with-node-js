exports.Query = {
  products: (parent, { filter }, { products, reviews }) => {
    let filterProducts = products;

    if (filter) {
      if (filter.onSale) {
        filterProducts = filterProducts.filter((product) => product.onSale);
      }

      if (filter.avgRating && [1, 2, 3, 4, 5].includes(filter.avgRating)) {
        filterProducts = filterProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= filter.avgRating;
        });
      }
    }

    return filterProducts;
  },
  product: (parent, args, { products }) => {
    return products.find((product) => product.id === args.id);
  },
  categories: (parent, args, { categories }) => {
    return categories;
  },
  category: (parent, args, { categories }) => {
    return categories.find((category) => category.id === args.id);
  },
};
