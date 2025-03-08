import FastifyStatic from "@fastify/static";
import FastifyView from "@fastify/view";
import Ejs from "ejs";
import Fastify from "fastify";
import Path from "node:path";
import { fileURLToPath } from "url";
import Broker from "./models/broker.ts";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = process.env.HOST || "0.0.0.0";
const __dirname = Path.dirname(fileURLToPath(import.meta.url));

// Setup settings Fastify
const fastify = Fastify({
    logger: true,
});

fastify.register(FastifyView, {
    engine: {
        ejs: Ejs,
    },
    root: Path.join(__dirname, "/views/pages"),
});
fastify.register(FastifyStatic, {
    root: Path.join(__dirname, "views"),
    prefix: "/public/",
});

//Setup Broker
const broker = new Broker();
broker.createServer();
broker.receiveMessagesOnPath("/");

// Routes
fastify.register(import("./routes/homeRoutes.ts"));

// Create Server
fastify.listen({ port: PORT, host: HOST }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`server listening on ${address}`);
});
