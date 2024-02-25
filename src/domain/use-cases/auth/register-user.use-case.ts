import { JwtAdapter } from '../../../config';
import { RegisterUserDTO } from '../../dto/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
	token: string,
	user: {
		id: string,
		name: string,
		email: string,
	}
}

interface RegisterUserUseCase {
	execute( registerUserDTO: RegisterUserDTO ): Promise< UserToken >
}

type SignToken = ( payload: Object, duration?: string ) => Promise< string | null >; 

export class RegisterUser implements RegisterUserUseCase {

	constructor(
		private readonly authRepository: AuthRepository,
		private readonly signToken: SignToken = JwtAdapter.generateToken,
	){}

	async execute( registerUserDTO: RegisterUserDTO ): Promise< UserToken > {

		const user = await this.authRepository.register( registerUserDTO );

		const token = await this.signToken({ id: user.id }, "2h" );
		if( !token ) throw CustomError.internalServer( "Error Generating Token" );

		return {
			token: token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			}
		}
	}
}