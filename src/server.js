import app from "../index.js";

const port = 3000;
app.listen(port, () => {
    console.log(`Iniciando o server http://localhost:${port}`);
})