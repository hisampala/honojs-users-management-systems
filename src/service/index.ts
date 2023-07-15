import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();
prismaClient.$on("beforeExit", () => {
  console.log("prisma client is Exit Connection !!");
});
