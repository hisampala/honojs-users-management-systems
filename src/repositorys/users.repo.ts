import { PrismaClient, Users, Prisma } from "@prisma/client";
import { prismaClient } from "../service";
const context = prismaClient;
async function CreateUsers(item: Users) {
  return await context.users.create({ data: item });
}
async function UpdateUsers(id: string, item: Users) {
  return await context.users.update({ where: { id: id }, data: item });
}
async function DeleteUsers(id: string) {
  return await context.users.delete({ where: { id: id } });
}
async function GetUsersById(id: string) {
  return await context.users.findUnique({ where: { id: id } });
}
async function GetUsers(option?: Prisma.UsersWhereInput, page = 0, limit = 10) {
  return await context.users.findMany({
    where: option,
    skip: limit,
    take: page,
  });
}
async function GetOne(option?: Prisma.UsersWhereInput) {
  return await context.users.findFirst({
    where: option,
  });
}
export const UserRepository = {
  CreateUsers,
  UpdateUsers,
  DeleteUsers,
  GetUsersById,
  GetUsers,
  GetOne,
};
