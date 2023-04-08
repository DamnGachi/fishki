import {AuthDto} from "../Dto/AuthDto";
import {sequelize} from "../../database/database";
import User from "../Models/User";

class AuthService {

   async authUser(data:any) {
       try {
            const credentials = new AuthDto(data);
            const user = await User.findOne({where: {email: credentials.email, password: credentials.password, isActive: true}, include: ['role']});
            return user;
        } catch (error) {
            return new Error("Неверный email или пароль");
        }
    }
}

export default new AuthService();
