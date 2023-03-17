const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLID } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "User type definition",
    fields: {
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        age: { type: GraphQLFloat },
        phone: { type: GraphQLFloat },
        image: { type: GraphQLString },
    }
})

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    description: "Product type definition",
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        price: { type: GraphQLFloat },
        stock: { type: GraphQLFloat },
        image: { type: GraphQLString },
    }
})

module.exports = { UserType, ProductType }
