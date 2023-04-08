import {AuthDto} from "../Dto/AuthDto";
import User from "../Models/User";

class AuthService {

   async authUser(data:any) {
       try {
            const credentials = new AuthDto(data);
           return await User.findOne({
                where: {
                    email: credentials.email,
                    password: credentials.password,
                    isActive: true
                }, include: ['role']
            });
        } catch (error) {
            return new Error("Неверный email или пароль");
        }
    }
}

export default new AuthService();
