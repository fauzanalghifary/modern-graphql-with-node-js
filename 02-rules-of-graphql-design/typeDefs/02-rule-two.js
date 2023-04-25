// Never expose implementation details in your API design
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
    Image
    [Car]
  }

  type AutomaticGroup {
    Image
    [Car]
    [AutomaticGroupFeatures!]
  }

  type AutomaticGroupFeatures {}
`;
