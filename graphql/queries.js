const { GraphQLID, GraphQLList } = require("graphql");
const User = require("../services/users.service");
const { UserType } = require("./types");

const newUser = new User()

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

module.exports = { getUserByID, getAllUsers }