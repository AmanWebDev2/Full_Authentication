const { User } = require('../model/index');
const bcrypt = require('bcrypt');
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
            // new true --> return updated user
            const resp = await User.findOneAndUpdate({id},data,{new:true});
            if(!resp) throw { error: 'User does not exist',statusCode: 404 }
            const { password,...rest } = Object.assign({},resp.toJSON());
            console.log(data,password);
            return rest;
        } catch (error) {
            throw error;
        }
    }

    
};

module.exports = UserRepository;