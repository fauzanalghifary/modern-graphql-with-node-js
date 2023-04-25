// Design your API around your business domain
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
    Image
    [Car]
    [GroupFeatures]
  }

  type GroupFeatures {}
`;
