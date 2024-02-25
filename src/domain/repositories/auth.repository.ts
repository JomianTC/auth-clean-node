import { UserEntity } from "../entities/user.entity";
import { RegisterUserDTO } from '../dto/auth/register-user.dto';
import { LoginUserDTO } from '../dto/auth/login-user.dto';

export abstract class AuthRepository {

	abstract login( loginUserDTO: LoginUserDTO ): Promise< UserEntity >;
	abstract register( registerUserDTO: RegisterUserDTO ): Promise< UserEntity >;
} 