// import dotenv from "dotenv";
// import { z } from "zod";

// dotenv.config();

// const envSchema = z.object({
//   PORT: z.string().default("3001").transform(Number),
//   DATABASE_URL: z.string().min(5, "DATABASE_URL é obrigatório🚨"),
//   NODE_ENV: z.enum(["dev", "test", "prod"], {
//     message: "🚨 Node ENV deve ser, test ou prod.",
//   }),

//   FIREBASE_PROJECT_ID: z.string().optional(),
//   FIEBASE_PRIVATE_KEY: z.string().optional(),
//   FIREBASE_CLIENT_EMAIL: z.string().optional(),
// });

// const _env = envSchema.safeParse(process.env);

// if (!_env.success) {
//   console.error("Váriaveis de ambiente inválidas");
//   process.exit(1);
// }

// export const env = _env.data;



import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ override: true });

console.log("NODE_ENV bruto:", JSON.stringify(process.env.NODE_ENV));

const envSchema = z.object({
  PORT: z.string().default("3001").transform(Number),
  DATABASE_URL: z.string().min(5, "DATABASE_URL é obrigatório🚨"),
  NODE_ENV: z.enum(["dev", "test", "prod"], {
    message: "🚨 Node ENV deve ser, test ou prod.",
  }),

  FIREBASE_PROJECT_ID: z.string().optional(),
  FIEBASE_PRIVATE_KEY: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("🚨 Váriaveis de ambiente inválidas:");
  console.error(_env.error.format());
  process.exit(1);
}

export const env = _env.data;
