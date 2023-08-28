import UsersRepository from "./usersRepository";
import userModel from "../dao/mongo/models/usersModel";
import UsersDTO from "../dto/users.dto";

const userDao = userModel.getDao();
export const usersRepository = new UsersRepository(userDao);
