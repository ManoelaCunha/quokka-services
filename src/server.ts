import "reflect-metadata";

import app from "./app";
import dotenv from "dotenv";
import dbConfig from "./database/ormconfig";

import { createConnection } from "typeorm";

dotenv.config();

createConnection(dbConfig)
  .then(() => {
    const PORT: string = process.env.PORT ?? "3000";

    app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));
