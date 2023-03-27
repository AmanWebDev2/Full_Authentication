const { User } = require('../model/index');

class UserRepository {

    static async register (data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username) {
        try {
            const user = await User.findOne({ username })
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByDetail({detail}) {
        try {
            const user = await User.findOne({ detail })
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserRepository;