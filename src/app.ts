import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { MongoDatabase } from "./data/mongodb";
 
// Funcion anonima auto-invocada
(() => {
	main();
})();


async function main() {
	
	await MongoDatabase.connect({
		dbName: envs.MONGO_DB_NAME,
		mongoURL: envs.MONGO_URL,
	});
	
	new Server({
		port: envs.PORT,
		routes: AppRoutes.routes
	}).start()
}
