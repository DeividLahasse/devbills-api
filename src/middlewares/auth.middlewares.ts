import type { FastifyReply, FastifyRequest } from "fastify";
import { getAuth } from "firebase-admin/auth";


declare module "fastify"{

interface FastifyRequest {
    userId?: string;
}}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    reply.status(401).send({ message: "🚨 Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    request.userId = decodedToken.uid
    }

   catch (error) {
    console.error("🚨 Erro ao verificar token:", error);
    reply.status(401).send({ message: "🚨 Token inválido ou expirado" });
    return;
  }
};


