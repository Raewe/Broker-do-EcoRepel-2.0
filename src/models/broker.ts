import Aedes from "aedes";
import { createServer } from "net";

class Broker {
    #port: number = 1883;
    #host: string = process.env.HOST || "0.0.0.0";
    #aedes: any;
    constructor(port?: number, host?: string) {
        if (port) {
            this.#port = port;
        }
        if (host) {
            this.#host = host;
        }
        this.#aedes = Aedes();
    }
    async #sendMessageToServer(url: string, message: object) {
        try {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });
        } catch (erro) {
            console.error("Erro ao enviar mensagem:", erro);
        }
    }

    receiveMessagesOnPath(path: string) {
        this.#aedes.on("publish", (packet: any, client: any) => {
            if (client) {
                const url = `http://localhost:${process.env.PORT || 3000}${
                    path !== "/" && !path.startsWith("/") ? "/" + path : path
                }`;
                let message = { id: client.id, topic: packet.topic };
                if (message.topic == "Alerta") {
                    console.log("Alerta Acionado !");
                    this.#sendMessageToServer(url, message);
                }
                console.log(
                    `📩 Mensagem recebida de ${client.id} no tópico "${
                        packet.topic
                    }": ${packet.payload.toString()}`
                );
            }
        });
    }

    createServer() {
        createServer(this.#aedes.handle).listen(this.#port, this.#host, () => {
            console.log(
                `🚀 Broker MQTT rodando na porta ${this.#port} em ${this.#host}`
            );
        });
    }
}

export default Broker;
