import type { FastifyInstance } from "fastify";
import creatTransaction from "src/controllers/transaction/createTransaction.controller";
import { deleteTransaction } from "src/controllers/transaction/deleteTransaction.controller";
import { getHistoricalTransactions } from "src/controllers/transaction/getHistoricalTransactions.controller";
import { getTransactions } from "src/controllers/transaction/getTransactions.controller";
import { getTransactionsSummary } from "src/controllers/transaction/getTransactionsSummary.controller";
import { authMiddleware } from "src/middlewares/auth.middlewares";
// import zodToJsonSchema from "zod-to-json-schema";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getHistoricalTransactionsShema,
  getTransactionsSummarySchema,
} from "./schemas/transaction.schema";

const transactionRouts = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authMiddleware);

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: createTransactionSchema,
    },
    handler: creatTransaction,
  });

  fastify.route({
    method: "GET",
    url: "/",
    handler: getTransactions,
  });

  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: getTransactionsSummarySchema,
    },
    handler: getTransactionsSummary,
  });

  // Histórico de transações//
  fastify.route({
    method: "GET",
    url: "/historical",
    schema: {
      querystring: getHistoricalTransactionsShema,
    },
    handler: getHistoricalTransactions,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: deleteTransactionSchema,
    },
    handler: deleteTransaction,
  });
};

export default transactionRouts;
