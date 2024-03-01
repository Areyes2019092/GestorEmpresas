"use strict";

import cors from 'cors';
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import adminRoutes from "../src/admin/admin.routes.js";
import companyRoutes from "../src/company/company.routes.js";
import { dbConnection } from "./mongo.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/company/v1/users";
    this.companyPath = "/company/v1/companies";

    this.middlewares();
    this.conectarDB();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(
      express.urlencoded({
        extended: false,
      })
    );
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.userPath, adminRoutes);
    this.app.use(this.companyPath, companyRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

export default Server;
