import UsersDTO from '../dto/users.dto.js';


export default class UsersRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getUser = async () => {
        const users = await this.dao.get();
        return users;
    }

    createUser = async (user) => {
        const userToInsert = new UsersDTO(user);
        const result = await this.dao.create(userToInsert);
        return result;
    }

    getById = async (id) => {
        const user = await this.dao.getById(id);
        return user;
    }

    createUser = async (user) => {
        await this.dao.create(user);
    }

    updateUser = async (id, user) => {
        await this.dao.update(id, user);
    }

    deleteUser = async (id) => {
        await this.dao.delete(id);
    }
}