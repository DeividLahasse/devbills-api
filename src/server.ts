import app from "./app";
import { env } from "./config/env";
import initializaAppFirebaseAdmin from "./config/firebase";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories";

const PORT = env.PORT;

initializaAppFirebaseAdmin();

const startServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log(`Servidor rodando na porta ${PORT} 🚀`));
  } catch (err) {
    console.log(err);
  }
};
startServer();
