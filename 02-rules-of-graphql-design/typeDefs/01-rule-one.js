// Always start with a high-level view of the objects and their relationships before you deal with specific fields
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
    [GroupMembership]
  }

  type AutomaticGroup {
    Image
    [GroupMembership]
    [AutomaticGroupFeatures!]
  }

  type AutomaticGroupFeatures {}

  type GroupMembership {
   Group
   Car
  }
`;
