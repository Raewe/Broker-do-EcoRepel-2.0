import type { FastifyReply, FastifyRequest } from "fastify";
import * as db from "../db/db.ts";
import { checkIfPagesExist } from "../utils/files.ts";
export async function getHome(req: FastifyRequest, res: FastifyReply) {
    db.select();
    const file = "home.ejs";
    const fileExists = checkIfPagesExist(file);
    if (fileExists) {
        await res.view(file, { name: "Pedro" });
    } else {
        await res.status(404).view("404.ejs");
    }
}
export async function postHome(req: FastifyRequest, res: FastifyReply) {
    //TODO: manda o código para o banco de dados
    console.log("Requisição recebida", req.body);
    res.code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(req.body);
}
