const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { getUserByID, getAllUsers } = require('./queries')
const { register, update } = require('./mutations')

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        getUserByID,
        getAllUsers
    }
})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: { register, update }
})

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})

module.exports = schema