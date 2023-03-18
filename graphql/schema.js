const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { getUserByID, getAllUsers, getProducts, getProductByID } = require('./queries')
const { register, update, createProduct, updateProduct, deleteProduct, deleteUser } = require('./mutations')

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        getUserByID,
        getAllUsers,
        getProducts,
        getProductByID
    }
})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: {
        register,
        update,
        deleteUser,
        createProduct,
        updateProduct,
        deleteProduct
    }
})

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})

module.exports = schema