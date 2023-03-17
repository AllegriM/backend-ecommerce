const { GraphQLString, GraphQLID } = require("graphql");
const User = require("../services/users.service");
const { UserType } = require("./types");

const newUser = new User()

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

// PRODUCTS     

module.exports = { register, update }