exports.Product = {
  category: (parent, args, { db }) => {
    return db.categories.find((category) => category.id === parent.categoryId);
  },
  reviews: (parent, args, { db }) => {
    return db.reviews.filter((review) => review.productId === parent.id);
  },
};
