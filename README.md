# README — Projeto Metrify

## Visão Geral
O **Metrify** é um projeto full stack desenvolvido para fins acadêmicos, integrando múltiplas disciplinas. A aplicação permite o gerenciamento de métricas do usuário, envolvendo cadastro, login, persistência de dados e interface responsiva.

Este repositório contém:
- Frontend Angular
- Backend Node.js + Express + TypeScript
- Banco MongoDB Atlas
- Containerização com Docker
- Pipeline CI com GitHub Actions

---

## Estrutura do Projeto
```
metrify/
│
├── backend/
│   ├── src/
│   ├── dist/
│   ├── backend.Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   ├── frontend.Dockerfile
│   └── angular.json
│
└── .github/workflows/ci.yml
```

---

## 1. Como Rodar o Projeto via Docker (Recomendado)
### Backend
```
docker build -t metrify-backend -f backend/backend.Dockerfile backend
docker run -p 5000:5000 metrify-backend
```
### Frontend
```
docker build -t metrify-frontend -f frontend/frontend.Dockerfile frontend
docker run -p 4200:4200 metrify-frontend
```
### Acessos
- Frontend: http://localhost:4200
- Backend: http://localhost:5000

### Atenção
Não se esqueça de estar com o DOCKER rodando em sua máquina! Aguarde até aparecer “Docker is running” no canto inferior direito.
---

## 2. Como Rodar Localmente Sem Docker
### Backend
```
cd backend
npm install
npm run dev
```
Para build:
```
npm run build
npm start
```
### Frontend
```
cd frontend
npm install
ng serve
```
Acessar: http://localhost:4200

---

## 3. Banco de Dados (MongoDB)
A conexão está configurada em:
```
backend/src/config/db.ts
```
A aplicação conecta automaticamente ao iniciar o backend.

---

## 4. Pipeline CI — GitHub Actions
O workflow está em:
```
.github/workflows/ci.yml
```
Ele executa:
- Instalação de dependências
- Build do backend
- Build do frontend
- Validação do TypeScript

Para rodar manualmente: ir até **Actions** > **CI** > **Run Workflow**.

---

## 5. Dockerfiles
### Backend
Inclui Node 18, dependências, build TypeScript e execução via `node dist/server.js`.
### Frontend
Inclui Node 18, build Angular e servidor.

---

## 6. Teste Rápido
```
cd metrify (raiz do projeto)

docker build -t metrify-backend -f backend/backend.Dockerfile backend
docker run -p 5000:5000 metrify-backend

docker build -t metrify-frontend -f frontend/frontend.Dockerfile frontend
docker run -p 4200:4200 metrify-frontend
```
### Via Node/Angular
- `npm run dev` no backend
- `ng serve` no frontend

---

## 7. Observações Finais
Projeto utilizado em duas disciplinas:
- DevOps / Nuvem (foco em CI/CD + Docker)
- Disciplina Integradora (frontend, backend, banco)

Todos os itens essenciais foram entregues: API funcional, front operacional, banco conectado, docker funcionando e pipeline ativo.