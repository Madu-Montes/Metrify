echo "📌 Build iniciado..."

docker build -t metrify-backend -f backend.Dockerfile ..
docker build -t metrify-frontend -f frontend.Dockerfile ..

echo "✅ Build finalizado com sucesso!"