// Rule 15 - Mutations Should Provide User/Business Level Errors
const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupDelete(groupID: ID!)
    groupPublish(groupID: ID!)
    grouUnpublish(groupID: ID!)
    groupAddCars(groupID: ID!, carIDs: ID!)
    groupRemoveCars(groupID: ID!, carIDs: ID!)
    groupCreate(
        GroupInput: GroupInput!
    ): GroupUpdatePayload
    groupUpdate(
        groupId: ID!
        GroupInput: GroupInput!
    ): GroupUpdatePayload
  }

  type GroupUpdatePayload {
    userErrors: [UserErrors!]!
    group: Group!
  }

  type UserErrors {
    message: String!
    field: [String!]!
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureFields
  }

  input ImageInput {
    id: ID!
    url: String!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeatures {
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }
`;
