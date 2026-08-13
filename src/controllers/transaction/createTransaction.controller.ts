import type { FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import prisma from "src/config/prisma";
import {
  type CreateTransactionBody,
  createTransactionSchema,
} from "../../routes/schemas/transaction.schema";

const createTransaction = async (
  request: FastifyRequest<{ Body: CreateTransactionBody }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autorizado" });
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message || "Validação inválida";
    return reply.status(400).send({ error: errorMessage });
  }

  const transaction = result.data;

  // validação do ObjectId movida para cá
  if (!ObjectId.isValid(transaction.categoryId)) {
    return reply.status(400).send({ error: "Categoria inválida" });
  }

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      return reply.status(400).send({ error: "Categoria inválida" });
    }

    const newtransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: new Date(transaction.date),
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newtransaction);
  } catch (err) {
    request.log.error({ err }, "🚨 Erro ao criar transação");
    reply.status(500).send({ error: "🚨 Erro interno do servidor" });
  }
};

export default createTransaction;
