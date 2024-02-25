import { Validators } from "../../../config";

export class LoginUserDTO {

	private constructor(
		public email: string,
		public password: string,
	){}

	static create( object: {[ key: string ]: any} ): [ string?, LoginUserDTO? ] {

		const { email, password } = object;

		if ( !email ) return [ "Missing email" ];
		if ( !Validators.email.test( email ) ) return [ "Email not valid" ];
		
		if ( !password ) return [ "Missing password" ];
		if ( password.length < 6 ) return [ "Password to short" ];

		return [
			undefined,
			new LoginUserDTO( email, password )
		];
	}
}
