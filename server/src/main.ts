import "module-alias/register";

import app from "@/app";
import { createServer } from "http";
import { normalizePort } from "@/utils/normalize";

import { config } from "dotenv";
config();
config({ path: "./env.local", override: true });

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = createServer(app);

server.listen(port, () => {
  console.log("🚀 ~~~ server started on port", port);
});
