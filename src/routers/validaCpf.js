import { Router } from "express";
import { cpf } from 'cpf-cnpj-validator';
import {param, validationResult} from "express-validator"

const router = Router();
router.get("/:cpfValue",
    param('cpfValue')
        .isNumeric().withMessage('Apenas caracteres numéricos')
        .isLength({
            min: 11,
            max: 11
        }).withMessage('Precisa ter o tamanho minino e maximo de 11 caracteres numéricos'),
    (req, res) => {

    const cpfValue = req.params.cpfValue
    const erros = validationResult(req);

    if (!erros.isEmpty() || !cpf.isValid(cpfValue)) {
        return res.status(500).send({
            errorParam: erros.array() != '' ? erros.array() : 'CPF inválido',
            response: null,
            status: res.statusCode
        });
    }

    const response = {
        message: 'CPF consultado com sucesso!',
        cpf: cpfValue,
        status: res.statusCode
    }
    res.status(200).send(response);
});

export default router;