import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getServiceAccount = (): ServiceAccount => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
  }

  // Fallback para desenvolvimento local, lendo do arquivo
  const path = join(__dirname, "../../firebase-service-account.json");
  const fileContent = readFileSync(path, "utf-8");
  return JSON.parse(fileContent) as ServiceAccount;
};

const initializaFirebaseAdmin = (): void => {
  if (getApps().length > 0) return;

  try {
    initializeApp({
      credential: cert(getServiceAccount()),
    });
  } catch (error) {
    console.error("🚨 Falha ao conectar ao firebase", error);
    process.exit(1);
  }
};

export default initializaFirebaseAdmin;
