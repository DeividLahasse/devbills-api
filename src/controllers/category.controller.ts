import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "src/config/prisma";

export const getCategories = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    reply.send(categories);
  } catch (err) {
    request.log.error({err},"🚨Error ao buscar cartegorias")
    reply.status(500).send({err:"🚨Error ao buscar catagorias"})
  }
};
