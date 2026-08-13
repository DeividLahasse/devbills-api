import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "src/config/prisma";
import type { DeleteTransactionParams } from "src/routes/schemas/transaction.schema";

export const deleteTransaction = async (
  request: FastifyRequest<{ Params: DeleteTransactionParams }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;
  const { id } = request.params;

  if (!userId) {
    reply.status(401).send({ error: "error não autenticado" });
  }

  try {
    const transaction = prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      reply.status(400).send({ error: " ID da ttransação inválido" });
      return;

    
    }

      await prisma.transaction.delete({where: { id }})

      reply.status(200).send({mesage:" transação deletada com sucesso✅"})
  } catch (error) {
    request.log.error({error}, " Error ao deletar transação")
    reply.status(500).send({error:"Error inerno no servidor, falha ao deleta rransação"})
  }
};
