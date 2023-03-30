const { User } = require('../model/index');

class UserRepository {

    static async register (data) {
        try {
            const user = await User.create(data);
            return user.username;
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
            const user = await User.findOne({ username });
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

    static async update(id,data) {
        try {   
            const resp = await User.findOneAndUpdate({id},data,{new:true});
            console.log(resp);
            if(!resp) throw { error: 'User does not exist',statusCode: 404 }
            const { password,...rest } = Object.assign({},resp.toJSON());
            return rest;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserRepository;