import mongoose from "mongoose";

interface Options {

	mongoURL: string;
	dbName: string;
}

export class MongoDatabase {

	static async connect( options: Options ) {

		const { dbName, mongoURL } = options;

		try {
			
			await mongoose.connect( mongoURL, {
				dbName: dbName,
			});

			console.log( "Mongo Connected" );
			return true;

		} catch ( error ) {
			console.log( "Mongo connection error" );
			throw error;
		}
	}


}

