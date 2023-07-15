import { hashSync } from "@node-rs/argon2";
import { v4 as uuid } from "uuid";
import { UserRepository } from "../repositorys";
export const seedUser = async () => {
  return UserRepository.CreateUsers({
    id: uuid(),
    email: "superadmin@gmail.com",
    full_name: "super admin ",
    password: hashSync("12345678"),
    role: "RootAdmin",
    phone: null,
  });
};
seedUser()
  .then((result) => {
    console.log("seed => ", result);
  })
  .catch((err) => {
    console.error(err);
  });
