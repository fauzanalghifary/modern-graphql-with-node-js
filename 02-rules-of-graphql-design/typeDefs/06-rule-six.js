// always check if a list should be paginated
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
    featureSet: GroupFeatureSet
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    imageId: ID!
    bodyHtml: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeatures {
    feature: String!
  }
`;
