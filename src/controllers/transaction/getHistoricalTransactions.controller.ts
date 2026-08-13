import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "src/config/prisma";
import type { GetHistoricalTransactionsQuery } from "src/routes/schemas/transaction.schema";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");
dayjs.extend(utc);

export const getHistoricalTransactions = async (
  request: FastifyRequest<{ Querystring: GetHistoricalTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autorizado" });
  }

  const { month, year, months = 6 } = request.query;

  const baseDate = new Date(year, month - 1, 1);

  const startDate = dayjs.utc(baseDate)
    .subtract(months - 1, "month")
    .startOf("month")
    .toDate();
  const endDate = dayjs.utc().endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        type: true,
        date: true,
      },
    });

    const monthlyData = Array.from({ length: months }, (_, i) => {
      const date = dayjs.utc(baseDate).subtract(months - 1 - i, "month");

      return {
        name: date.format("MMM/YYYY"),
        income: 0,
        expense: 0,
      };
    });

    transactions.forEach((transactions) => {
      const monthKey = dayjs.utc(transactions.date).format("MMM/YYYY");
      const monthData = monthlyData.find((m) => m.name === monthKey);

      if (monthData) {
        if (transactions.type === "income") {
          monthData.income += transactions.amount;
        } else {
          monthData.expense += transactions.amount;
        }
      }
    });
    reply.send({ history: monthlyData });
  } catch (_err) {}
};
