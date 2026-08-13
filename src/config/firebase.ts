import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import serviceAccount from "../../firebase-service-account.json";

const initializaFirebaseAdmin = (): void => {
  if (getApps().length > 0) return;

  try {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.error("🚨 Falha ao conectar ao firebase", error);
    process.exit(1);
  }
};

export default initializaFirebaseAdmin;
