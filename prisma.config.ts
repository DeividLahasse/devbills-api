import "dotenv/config";
import { defineConfig, env } from "prisma/config";

console.log("DEBUG DATABASE_URL:", process.env.DATABASE_URL);

export default defineConfig({
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
})
