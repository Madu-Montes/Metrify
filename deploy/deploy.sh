#!/bin/bash

echo "🚀 Iniciando deploy..."

docker-compose down
docker-compose up -d --build

echo "✅ Deploy concluído!"
