import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "src/config/prisma";
import type { getTransactionsSummaryQuery } from "src/routes/schemas/transaction.schema";
import type { CategorySumary } from "src/types/category.types";
import type { TransactionSumary } from "src/types/transaction.types";
import { TransactionType } from "#prisma";

dayjs.extend(utc);

export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: getTransactionsSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autorizado" });
  }

  const { month, year } = request.query;

  if (!month || !year) {
    reply.status(400).send({ error: "Mês e ano são obrigatorio🚨" });
    return;
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs.utc(`${year}-${month}-01`).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },

      include: {
        category: true,
      },
    });


 
    let totalExpenses = 0;
    let totalIncomes = 0;
    const groupedExpenses = new Map<string, CategorySumary>();

    for (const transaction of transactions) {
      if (transaction.type === TransactionType.expense) {
        totalExpenses += transaction.amount
        const existing = groupedExpenses.get(transaction.categoryId) ?? {
          categoryId: transaction.categoryId,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: 0,
          percentage: 0,
        };

        existing.amount += transaction.amount;
        groupedExpenses.set(transaction.categoryId, existing);
      } else {
        totalIncomes += transaction.amount;
      }
    }

    const summary: TransactionSumary = {
      totalExpenses,
      totalIncomes,
      balance: Number((totalIncomes - totalExpenses).toFixed(2)),
      expensesByCategory: Array.from(groupedExpenses.values())
        .map((entry) => ({
          ...entry,
          percentage: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2)),
        }))
        .sort((a, b) => b.amount - a.amount),
    };

    console.log(groupedExpenses, totalExpenses, totalIncomes);

    reply.send(summary);
  } catch (err) {
    request.log.error({ err }, "🚨 Erro ao buscar transações");
    reply.status(500).send({ error: "🚨 Erro interno do servidor" });
  }
};
