const { UserRepository } = require('../repository/index');

class UserService {

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
            
            const user = await UserRepository.register(userData);
            return user;
        } catch (error) {
            throw error;
        }
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