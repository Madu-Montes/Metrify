$ErrorActionPreference = "Stop"

Write-Output "Build iniciado..."

docker build -t metrify-backend -f backend.Dockerfile ..
docker build -t metrify-frontend -f frontend.Dockerfile ..

Write-Output "Build finalizado com sucesso!"
