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

  type ManualGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    membership: [GroupMembership!]!
  }

  type AutomaticGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    feature: [AutomaticGroupFeatures!]!
    applyFeaturesSeparately: Boolean!
    membership: [GroupMembership!]!
  }

  type AutomaticGroupFeatures {
    column: String!
  }

  type GroupMembership {
    groupId: ID!
    carId: ID!
  }
`;
