import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";
import { LoginUserDTO } from "../../domain/dto/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = ( password: string ) => string;
type CompareFunction = ( password: string, hashed: string ) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

	constructor(
		private readonly hashPassword: HashFunction = BcryptAdapter.hash,
		private readonly comparePassword: CompareFunction = BcryptAdapter.compare
	){}

	async login( loginUserDTO: LoginUserDTO ): Promise< UserEntity > {

		const { email, password } = loginUserDTO;

		try {

			// Verificar si el correo existe
			const user = await UserModel.findOne({ email });
			if ( !user ) throw CustomError.badRequest( "User does not exists" );

			// Comprobar la constrasena
			const passwordIsCorrect = this.comparePassword( password, user.password );
			if ( !passwordIsCorrect )
				throw CustomError.badRequest( "Password incorrect" );

			return UserMapper.userEntityFromObject( user! );

		} catch (error) {

			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer();
		}
	}

	async register( registerUserDTO: RegisterUserDTO ): Promise<UserEntity> {

		const { name, email, password } = registerUserDTO;

		try {

			// Verificar si el correo existe
			const exists = await UserModel.findOne({ email });
			if ( exists ) throw CustomError.badRequest( "User already exists" );

			// Cifrar la constrasena
			const user = await UserModel.create({ name, email, password: this.hashPassword( password ) });
			await user.save();

			// Mapear la respuesta a nuestra entidad
			// return new UserEntity(
			// 	user.id,
			// 	name,
			// 	email,
			// 	user.password,
			// 	user.roles,
			// );

			return UserMapper.userEntityFromObject( user );

		} catch (error) {

			if ( error instanceof CustomError ) throw error;
			throw CustomError.internalServer();
		}
	}
}