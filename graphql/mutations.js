const { GraphQLString, GraphQLID, GraphQLFloat } = require("graphql");
const User = require("../services/users.service");
const Product = require("../services/products.service");
const { UserType, ProductType } = require("./types");

const newUser = new User()
const newProduct = new Product()
// USER 

const register = {
    type: UserType,
    description: "Register a new user",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { email, password, name, phone, address, age, image } = args
        await newUser.create({ email, password, name, phone, address, age, image });
        return "User created"
    }
}

const update = {
    type: UserType,
    description: "Update a user",
    args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        age: { type: GraphQLString },
        image: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const updatedUser = {
            _id: args.id,
            ...args
        }
        await newUser.update(args.id, args);
        return updatedUser
    }
}

const deleteUser = {
    type: UserType,
    description: "Delete a user",
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        await newUser.delete(args.id);
        return "User deleted"
    }
}

// PRODUCTS         

const createProduct = {
    type: ProductType,
    description: "Create a new product",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        price: { type: GraphQLString },
        stock: { type: GraphQLString },
        image: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { title, price, stock, image } = args
        await newProduct.create({ title, price, stock, image });
        return "Product created"
    }
}

const updateProduct = {
    type: ProductType,
    description: "Update a product",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        price: { type: GraphQLString },
        stock: { type: GraphQLString },
        image: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const updatedProduct = {
            _id: args.id,
            ...args
        }
        await newProduct.update(args.id, args);
        return updatedProduct
    }
}

const deleteProduct = {
    type: ProductType,
    description: "Delete a product",
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        await newProduct.delete(args.id);
        return "Product deleted"
    }
}



module.exports = { register, update, deleteUser, createProduct, updateProduct, deleteProduct }