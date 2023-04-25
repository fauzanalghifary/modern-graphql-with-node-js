// It's easier to add fields than to remove them.
const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    features: [GroupFeatures!]
    applyFeaturesSeparately: Boolean!
    cars: [Car!]!
    name: String!
    imageId: ID!
    bodyHtml: String!
  }

  type GroupFeatures {
    feature: String!
  }
`;
