import UsersRepository from "./usersRepository";
import userModel from "../dao/mongo/models/usersModel";


const userDao = userModel.getDao();
export const usersRepository = new UsersRepository(userDao);
