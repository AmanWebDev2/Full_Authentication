const { UserRepository } = require('../repository/index');

const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
class UserService {

    static #createToken(user) {
        try {
            console.log(user);
            const token = jwt.sign(user,JWT_KEY,{ expiresIn: '1h' });
            return token;
        } catch (error) {
            throw error;
        }
    }

    static async registerUser(userData) {
        try {
            const { email,username } = userData;

            // check for existing username
            const isUserExist = await UserRepository.getUserByUsername(username);
            if(isUserExist) {
                throw { error: "username alread exist" };
            }

            // check for existing email
            const isEmailExist = await UserRepository.getUserByEmail(email);
            if(isEmailExist) {
                throw { error: "email already exist" };
            }
            
            const resp = await UserRepository.register(userData);
            return resp;
        } catch (error) {
            throw error;
        }
    }

    static async login(username,plainPassword) {
        try {
            // if user exists or not
            const user = await UserRepository.getUserByUsername(username);
            if(!user) {
                throw {error: 'user does not exits'};
            }
            console.log(user);
            // order matters plainPassword and user.password
            const passwordMatched = bcypt.compareSync(plainPassword,user.password);
            if(!passwordMatched) {
                throw {
                    error: 'Incorrect password'
                }
            }

            // create token
            const token = this.#createToken({id:user._id,email:user.email});
            return token;

        } catch (error) {
            throw error;
        }
    }

    static async isAuthenticate(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'};
            }
            const user = await UserRepository.getUserByEmail(response.email);
            if(!user) {
                throw {error:'No user exist with corresponding token'};
            }
            return user._id;
        } catch (error) {
            throw error;
        }
    }
    
    static verifyToken(token) {
        const response = jwt.verify(token,JWT_KEY);
        return response;
    }

    static async getUsers() {
        try {
            const users = await UserRepository.getAllUsers();
            return users;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserService;