import { get } from "env-var";

export const envs = {

	// Usamos la implementacion nativa de .env de node en la version 20
	PORT: get( "PORT" ).required().asPortNumber(),
	MONGO_URL: get( "MONGO_URL" ).required().asString(),
	MONGO_DB_NAME: get( "MONGO_DB_NAME" ).required().asString(),
	JWT_SEED: get( "JWT_SEED" ).required().asString(),
}

