const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        hello: {
            type: GraphQLString,
            description: "Returns a string",
            resolve: () => "Hello World"
        }
    }
})

const schema = new GraphQLSchema({
    query: QueryType
})

module.exports = schema