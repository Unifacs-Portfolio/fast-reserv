import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, (err) => {
	if (err) {
		console.error(err);
	}
	console.log("Servidor rodando na porta 3000");
});
