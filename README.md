# DevBills API

API REST do **DevBills**, uma aplicação de gerenciamento financeiro pessoal para controle de receitas, despesas, categorias e histórico financeiro.

O backend é responsável pelas regras de negócio, autenticação, persistência dos dados e disponibilização dos endpoints utilizados pelo frontend.

## 🌐 Aplicação

A interface web do DevBills está disponível em produção:

https://devbills-interface-five.vercel.app/

## 🚀 Sobre o projeto

A **DevBills API** foi desenvolvida para fornecer uma API REST segura e estruturada para o gerenciamento financeiro dos usuários.

Entre suas responsabilidades estão:

* Autenticação e autorização dos usuários
* Gerenciamento de transações
* Gerenciamento de categorias
* Resumo financeiro
* Histórico de transações
* Persistência de dados
* Validação de dados
* Controle de acesso por usuário

## ✨ Funcionalidades

* 🔐 Autenticação utilizando Firebase Admin
* 👤 Identificação do usuário autenticado
* 💰 Criação de receitas e despesas
* 📋 Listagem de transações
* 🗑️ Exclusão de transações
* 🏷️ Categorias de receitas e despesas
* 📊 Resumo financeiro
* 📅 Histórico de transações
* ✅ Validação dos dados utilizando Zod
* 🗄️ Persistência utilizando Prisma ORM
* 🌐 API REST com Fastify
* 🚀 Deploy em produção utilizando Railway

## 🛠️ Tecnologias

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* PostgreSQL
* Firebase Admin
* Zod
* Fastify Zod Type Provider
* tsx
* Railway
* Git / GitHub

## 📁 Estrutura do projeto

```text
src/
├── config/
│   ├── env.ts
│   ├── firebase.ts
│   └── prisma.ts
│
├── controllers/
│   ├── category/
│   └── transaction/
│
├── middlewares/
│   └── auth.middlewares.ts
│
├── routes/
│   ├── category.routes.ts
│   ├── transaction.routes.ts
│   └── schemas/
│
├── services/
│   └── globalCategories.ts
│
├── generated/
│   └── prisma/
│
├── app.ts
└── server.ts

prisma/
└── schema.prisma
```

## 🔌 API

A API utiliza o prefixo:

```text
/api
```

### Categorias

Obter todas as categorias:

```http
GET /api/categories
```

Exemplo:

```json
[
  {
    "id": "6a2bea95e4844676da446230",
    "name": "Alimentação",
    "color": "#FF5733",
    "type": "expense"
  }
]
```

### Transações

Criar uma transação:

```http
POST /api/transactions
```

Listar transações:

```http
GET /api/transactions
```

Excluir uma transação:

```http
DELETE /api/transactions/:id
```

### Resumo financeiro

```http
GET /api/transactions/summary
```

Parâmetros:

```text
month
year
```

Exemplo:

```text
/api/transactions/summary?month=8&year=2026
```

### Histórico

```http
GET /api/transactions/historical
```

Parâmetros:

```text
month
year
months
```

## 🔐 Autenticação

A API utiliza **Firebase Admin** para validar a autenticação dos usuários.

As rotas protegidas utilizam um middleware de autenticação:

```text
authMiddleware
```

Esse middleware valida o token enviado pelo frontend antes de permitir o acesso aos recursos protegidos.

O fluxo é:

```text
Frontend
   ↓
Firebase Authentication
   ↓
Token de autenticação
   ↓
DevBills API
   ↓
Firebase Admin
   ↓
Middleware de autenticação
   ↓
Controller
   ↓
Prisma
   ↓
PostgreSQL
```

## 🗄️ Banco de dados

O projeto utiliza **Prisma ORM** para comunicação com o banco de dados.

O schema está localizado em:

```text
prisma/schema.prisma
```

O Prisma Client é gerado durante o processo de deploy.

Para gerar o client manualmente:

```bash
npx prisma generate
```

Para executar migrations:

```bash
npx prisma migrate dev
```

## 🌱 Categorias globais

Ao iniciar a aplicação, o backend executa a inicialização das categorias globais:

```text
initializeGlobalCategories()
```

Isso garante que as categorias padrão estejam disponíveis para utilização pela aplicação.

Entre elas:

* Alimentação
* Compras
* Educação
* Lazer
* Moradia
* Saúde
* Transporte
* Outros
* Salário
* Freelance
* Investimentos

## 🔑 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
NODE_ENV=dev
PORT=3001
DATABASE_URL=your_database_url

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

> **Importante:** nunca envie credenciais reais, chaves privadas ou arquivos `.env` para o GitHub.

## 💻 Instalação

Clone o repositório:

```bash
git clone https://github.com/DeividLahasse/devbills-api.git
```

Entre na pasta:

```bash
cd devbills-api
```

Instale as dependências:

```bash
yarn install
```

ou:

```bash
npm install
```

## ▶️ Desenvolvimento

Execute o projeto em modo de desenvolvimento:

```bash
yarn dev
```

ou:

```bash
npm run dev
```

A API será executada, por padrão, na porta:

```text
3001
```

Localmente:

```text
http://localhost:3001
```

## 🏗️ Prisma

Depois de configurar o banco de dados, gere o Prisma Client:

```bash
npx prisma generate
```

Para executar migrations em desenvolvimento:

```bash
npx prisma migrate dev
```

## 🧪 Produção

Para iniciar a aplicação:

```bash
npm start
```

O servidor utiliza a variável:

```env
PORT=3001
```

e fica disponível publicamente através do Railway.

## 🌐 Deploy

A API está hospedada no **Railway**.

Endpoint de produção:

https://devbills-api-production-4b40.up.railway.app/

A API utiliza a branch `main` para deploy automático.

Sempre que uma alteração é enviada para a branch `main`, o Railway pode iniciar um novo deployment automaticamente.

## 🔗 Projeto Frontend

Frontend do DevBills:

https://github.com/DeividLahasse/devbills-interface

Aplicação em produção:

https://devbills-interface-five.vercel.app/

## 📡 Comunicação entre Frontend e API

Em produção, o fluxo principal é:

```text
┌──────────────────────────────┐
│       DevBills Interface     │
│           Vercel             │
└──────────────┬───────────────┘
               │
               │ HTTP / REST
               ▼
┌──────────────────────────────┐
│          DevBills API        │
│           Railway            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          PostgreSQL          │
└──────────────────────────────┘
```

A autenticação utiliza:

```text
Firebase Authentication
        ↓
Firebase Admin
        ↓
DevBills API
```

## 📌 Status do projeto

**Em desenvolvimento 🚧**

Atualmente a API possui:

* ✅ Autenticação
* ✅ Categorias
* ✅ Criação de transações
* ✅ Listagem de transações
* ✅ Exclusão de transações
* ✅ Resumo financeiro
* ✅ Histórico de transações
* ✅ Integração com PostgreSQL
* ✅ Prisma ORM
* ✅ Deploy em produção

## 👨‍💻 Autor

**Deivid Lahasse**

Projeto desenvolvido para gerenciamento financeiro pessoal utilizando Node.js, TypeScript, Fastify, Prisma, PostgreSQL e Firebase.
