import { AuthDatasource, RegisterUserDTO, UserEntity } from '../../domain';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { LoginUserDTO } from '../../domain/dto/auth/login-user.dto';

export class AuthRepositoryImpl implements AuthRepository {

	constructor(
		private readonly authDatasource: AuthDatasource,
	){}

	register( registerUserDTO: RegisterUserDTO ): Promise<UserEntity> {
		return this.authDatasource.register( registerUserDTO );
	}

	login( loginUserDTO: LoginUserDTO ): Promise<UserEntity> {
		return this.authDatasource.login( loginUserDTO );
	}
}


