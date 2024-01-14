import path from "node:path";

import { EStatusTodo, ITodo, IUser } from "../interfaces";

export const userExample: IUser[] = [
  {
    id: 1,
    firstName: "firstName",
    lastName: "lastName",
    age: 18,
    email: "example@gmail.com",
    password: "password",
  },
];

export const todoExample: ITodo[] = [
  {
    id: 1,
    todoText: "",
    status: EStatusTodo.ACTIVE,
  },
];

export const dbPath = path.join(process.cwd(), "dataBase.json");

export const staticPath = path.join(process.cwd(), "src", "static");
