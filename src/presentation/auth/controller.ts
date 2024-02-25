import { Request, Response } from "express"
import { RegisterUserDTO, AuthRepository, CustomError, RegisterUser } from "../../domain";
import { UserModel } from "../../data/mongodb";
import { LoginUserDTO } from "../../domain/dto/auth/login-user.dto";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";

export class AuthController {

	constructor(
		private readonly authRepository: AuthRepository,
	){}

	private handleError = ( error: unknown, res: Response ) => {

		if ( error instanceof CustomError )
		return res.status( error.statusCode ).json({ error: error.message })

		console.log( error );
		return res.status( 500 ).json({ error: "Internal Server Error" });
	}

	registerUser = ( req: Request, res: Response ) => {

		const [ errorDTO, registerUserDto ] = RegisterUserDTO.create( req.body );
		if ( errorDTO ) return res.status( 400 ).json({ errorDTO });

		new RegisterUser( this.authRepository )
			.execute( registerUserDto! )
			.then( data => res.json( data ) )
			.catch( error => this.handleError( error, res ) );

		return;
	}
	
	loginUser = ( req: Request, res: Response ) => {

		const [ errorDTO, loginUserDto ] = LoginUserDTO.create( req.body );
		if ( errorDTO ) return res.status( 400 ).json({ errorDTO });

		new LoginUser( this.authRepository )
			.execute( loginUserDto! )
			.then( data => res.json( data ) )
			.catch( error => this.handleError( error, res ) );

		return;
	}

	getUsers = ( req: Request, res: Response ) => {

		UserModel.find()
		.then( _users => {
			res.json({
				user: req.body.user
			})})
		.catch( () => res.status( 500 ).json({ error: "Internal Server Error" }) );
	}
}