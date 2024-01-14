import fs from "node:fs/promises";
import path from "node:path";

import { dbPath } from "../configs";
import { IUser } from "../interfaces";

class FsService {
  public async createDataBase(userExample: IUser[]): Promise<void> {
    await fs.writeFile(dbPath, `${JSON.stringify(userExample)}`);
    await fs.mkdir(path.join(process.cwd(), "todoBase"));
  }

  public async createTodoListForUser(email: string): Promise<void> {
    await fs.writeFile(
      path.join(process.cwd(), "todoBase", `${email}.json`),
      `${JSON.stringify([])}`,
    );
  }

  public async readerDataBase(): Promise<IUser[]> {
    const usersJson = await fs.readFile(dbPath, { encoding: "utf-8" });
    return JSON.parse(usersJson);
  }

  public async readerTodoDataBase(email: string): Promise<string[]> {
    const todoUsersJson = await fs.readFile(
      path.join(process.cwd(), "todoBase", `${email}.json`),
      { encoding: "utf-8" },
    );
    return JSON.parse(todoUsersJson);
  }

  public async writeDataBase(users: IUser[]): Promise<void> {
    await fs.writeFile(dbPath, JSON.stringify(users));
  }

  public async writeTodoUserDataBase(
    todo: string,
    email: string,
  ): Promise<void> {
    const arrTodo = await this.readerTodoDataBase(email);
    if (todo !== "") {
      arrTodo.push(todo);
      await fs.writeFile(
        path.join(process.cwd(), "todoBase", `${email}.json`),
        JSON.stringify(arrTodo),
      );
    }
  }
}
export const fsService = new FsService();
