import type { FastifyInstance } from "fastify";
import categoryRoutes from "./category.routes";
import transactionRoutes from "./transaction.routes";

const routes = (fastify: FastifyInstance, _opts: unknown, done: () => void) => {
  fastify.get("/health", async () => {
    return {
      status: "ok",
      message: "DevBlls API rodando normalmente🚀",
    };
  });

  fastify.register(categoryRoutes, { prefix: "/categories" });
  fastify.register(transactionRoutes, { prefix: "/transactions" });
  done();
};

export default routes;
