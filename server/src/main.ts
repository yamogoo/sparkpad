import "module-alias/register";

import { config } from "dotenv";
config();
config({ path: `.env.local`, override: true });

import app from "@/app";
import http from "http";
import { normalizePort } from "@/utils/normalize";

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("🚀 ~~~ server started on port", port);
});
