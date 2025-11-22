# Deploy – Metrify

Esta pasta contém os scripts e arquivos necessários para a containerização e deploy do projeto **Metrify**, utilizados na Fase 2 da Disciplina Integradora (DevOps).

## Conteúdo

- **backend.Dockerfile** → Cria a imagem do backend (Node + Express)
- **frontend.Dockerfile** → Cria a imagem do frontend (Angular)
- **docker-compose.yml** → Orquestra os containers em rede interna
- **build.sh** → Script de build das imagens
- **deploy.sh** → Script de deploy (via Docker Compose)
- **run-local.sh** → Executa o ambiente completo localmente

## Como executar localmente

```bash
chmod +x *.sh
./run-local.sh
