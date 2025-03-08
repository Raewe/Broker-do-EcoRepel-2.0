import type { FastifyInstance } from "fastify";
import { getHome, postHome } from "../controllers/homeControllers.ts";

export default async function homeRoute(app: FastifyInstance) {
    app.get("/", getHome);
    app.post("/", postHome);
}
