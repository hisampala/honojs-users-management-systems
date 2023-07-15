import { Users } from "@prisma/client";
import { UserRepository } from "../repositorys";
import { HTTPException } from "hono/http-exception";
import { hashSync } from "@node-rs/argon2";
async function GetAll(page = 0, limit = 10) {
  try {
    const result = await UserRepository.GetUsers({}, page, limit);
    return result;
  } catch (error) {
    throw new HTTPException(400, {
      message: error,
    });
  }
}
async function GetById(id: string) {
  try {
    const result = await UserRepository.GetUsersById(id);
    if (result) {
      delete result.password;
      return result;
    } else {
      throw new HTTPException(400, {
        message: `not found users id ${id}`,
      });
    }
  } catch (error) {
    throw new HTTPException(400, {
      message: error,
    });
  }
}
async function Delete(id: string) {
  try {
    await GetById(id);
    const result = await UserRepository.DeleteUsers(id);
    return result;
  } catch (error) {
    throw new HTTPException(400, {
      message: error,
    });
  }
}
async function Create(item: Users) {
  try {
    const isDupicateEmail = await UserRepository.GetOne({
      email: item.email,
    });
    if (isDupicateEmail) {
      throw new HTTPException(400, {
        message: `is dupicate email : ${item.email}`,
      });
    } else {
      item.password = hashSync(item.password);
      const result = await UserRepository.CreateUsers(item);
      return await GetById(result.id);
    }
  } catch (error) {
    throw new HTTPException(400, {
      message: error,
    });
  }
}
async function Update(id: string, item: Users) {
  try {
    await GetById(id);
    const result = await UserRepository.UpdateUsers(id, item);
    return result;
  } catch (error) {
    throw new HTTPException(400, {
      message: error,
    });
  }
}
export const UsersController = { GetAll, GetById, Delete, Create, Update };
