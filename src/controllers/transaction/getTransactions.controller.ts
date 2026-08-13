import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "src/config/prisma";
import { getTransactionsSchema } from "src/routes/schemas/transaction.schema";
import type { TransactionFilter } from "src/types/transaction.types";

dayjs.extend(utc);

export const getTransactions = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autorizado" });
  }

  const result = getTransactionsSchema.safeParse(request.query);

  if (!result.success) {
    return reply.status(400).send({ error: result.error.issues[0].message });
  }

  const { month, categoryId, year, type } = result.data;

  const filters: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(`${year}-${month}-01`).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });

    reply.status(200).send(transactions);
  } catch (err) {
    request.log.error({ err }, "🚨 Erro ao buscar transações");
    reply.status(500).send({ error: "🚨 Erro interno do servidor" });
  }
};
