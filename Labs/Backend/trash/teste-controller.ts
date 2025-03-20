import {Express, Request, Response, Router} from "express";

export const testController = (server: Express) => {
    const router = Router();

    router.get("/1", (request, response) => {
        response.status(200).send("Recebe requisições get");
    });

    router.post("/2", (request: Request, response: Response) => {
        const data = request.body;
        console.log(data);


        response.status(200).send(data);
    });

    server.use("/test", router); // => Aplicado como prefixo para todos acima
}

