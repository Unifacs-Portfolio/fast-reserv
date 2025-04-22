import { config } from "dotenv";
import { PrismaClient } from '@prisma/client';
import express from 'express';

config({ path: ".env" });


const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.qualquer.create({
    data: {
      nome: 'Fulano',
      idade: 12,
    },
  });

  console.log(newUser);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

// express


const app = express();
const PORT = 3000;

// Rota principal
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

