import express, { Request, Response } from "express";
import { engine } from "express-handlebars";

import { apiConfig, staticPath, userExample } from "./configs";
import { fsService } from "./services";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(staticPath));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", staticPath);

let errorState = "";
app.get("/login", async (req: Request, res: Response) => {
  res.render("login");
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes("@")) {
      throw new Error("wrong email");
    }

    const users = await fsService.readerDataBase();
    const user = users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      throw new Error("wrong email or password");
    }
    res.redirect(`/todo-user/${user.email}`);
  } catch (e: any) {
    errorState = e.message;
    res.render("login", { errorState });
  }
});

app.get("/register", async (req: Request, res: Response) => {
  res.render("register");
});
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const age = Number(req.body.age);

    if (!firstName || firstName.length <= 2) {
      throw new Error("first name must be more than 2 characters");
    }
    if (!lastName || lastName.length <= 2) {
      throw new Error("last name must be more than 2 characters");
    }
    if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
      throw new Error("must be more than min 1 and max 100");
    }
    if (!email || !email.includes("@")) {
      throw new Error("wrong email");
    }
    const users = await fsService.readerDataBase();
    const lastId = users[users.length - 1].id;
    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      age,
      email,
      password,
    };
    users.push(newUser);

    await fsService.writeDataBase(users);
    await fsService.createTodoListForUser(newUser.email);
    res.status(201).render("login");
  } catch (e: any) {
    errorState = e.message;
    res.render("register", { errorState });
  }
});

app.get("/todo-user/:email", async (req: Request, res: Response) => {
  const email = req.params.email;
  const todoArr = await fsService.readerTodoDataBase(email);
  res.render("todoUser", { email, todoArr });
});

app.post("/todo-user/:email", async (req: Request, res: Response) => {
  const email = req.params.email;
  const { todoText } = req.body;

  await fsService.writeTodoUserDataBase(todoText, email);
  const todoArr = await fsService.readerTodoDataBase(email);
  res.render("todoUser", { email, todoArr });
});

app.listen(apiConfig.PORT, async () => {
  try {
    await fsService.readerDataBase().then();
    console.log("DataBase successfully reader");
  } catch (e) {
    await fsService.createDataBase(userExample).then();
    console.log("DataBase successfully created");
  }

  console.log(`Server has successfully started on PORT ${apiConfig.PORT}`);
});
