import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import validaCpf from "./src/routers/validaCpf.js";

const app = express();

const validaCpfRouter = validaCpf;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());
app.use("/valida-cpf", validaCpfRouter);

app.use( async  (req, res, next) => {
    const erro = await new Error('Não encontrado...');
    erro.status = 404;
    next(erro);
});

app.use( async (error, req, res, next) => {
    await res.status(error.status || 500);
    return res.send(
        {
            erro: {
                message: error.message,
                status: res.statusCode
            }
        }
    );
});

export default app;