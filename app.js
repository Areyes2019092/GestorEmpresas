import { config } from "dotenv";

config();

import Server from "./config/server";

const server = new Server();

server.listen();