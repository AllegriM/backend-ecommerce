const { GraphQLID, GraphQLList } = require("graphql");
const User = require("../services/users.service");
const Product = require("../services/products.service");
const { UserType, ProductType } = require("./types");

const newUser = new User()
const newProduct = new Product()

const getAllUsers = {
    type: new GraphQLList(UserType),
    description: "Get all users",
    resolve: async () => {
        return await newUser.getAll();
    }
}

const getUserByID = {
    type: UserType,
    description: "get a user by its ID",
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const { id } = args
        return await newUser.getById(id);
    }
}

// Products queries

const getProducts = {
    type: new GraphQLList(ProductType),
    description: "Get all products",
    resolve: async () => {
        return await newProduct.getAll();
    }
}

const getProductByID = {
    type: ProductType,
    description: "get a product by its ID",
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const { id } = args
        return await newProduct.getById(id);
    }
}



module.exports = { getUserByID, getAllUsers, getProducts, getProductByID }