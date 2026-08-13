import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { TransactionType } from "#prisma";

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Descrição obrigatória"),
  amount: z.number().positive("Valor deve ser positivo"),
  date: z.coerce.date(),
  categoryId: z.string().min(1, "Categoria obrigatória"),
  type: z.enum([TransactionType.expense, TransactionType.income], {
    message: "Tipo inválido",
  }),
});

export const getTransactionsSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  type: z
    .enum([TransactionType.expense, TransactionType.income], {
      message: "Tipo inválido",
    })
    .optional(),
  categoryId: z.string().min(1, "Categoria obrigatória").optional(),
});

export const getTransactionsSummarySchema = z.object({
  month: z.string({ message: " O mês é obrigatório🚨" }),
  year: z.string({ message: "O ano é obrigatório🚨" }),
});


export const getHistoricalTransactionsShema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2000).max(2100),
  months:z.coerce.number().min(1).max(12).optional(),
});

export const deleteTransactionSchema = z.object({
  id: z.string().refine(isValidObjectId, {
    message: "ID Inválido",
  }),
});



export type GetHistoricalTransactionsQuery = z.infer<typeof getHistoricalTransactionsShema>

export type DeleteTransactionParams = z.infer<typeof deleteTransactionSchema>;

export type GetTransactionQuery = z.infer<typeof getTransactionsSchema>;

export type getTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>;

export type CreateTransactionBody = z.infer<typeof createTransactionSchema>;
