import type { FastifyInstance } from "fastify";
import { getCategories } from "../controllers/category.controller";

const categoryRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", getCategories);
};

export default categoryRoutes;
