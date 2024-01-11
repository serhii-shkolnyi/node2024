import express from "express";

import { apiConfig } from "./configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(apiConfig.PORT, async () => {
  console.log(`Server has successfully started on PORT ${apiConfig.PORT}`);
});
