docker build -t gcr.io/gogolook-compass/moonkat-app:v1 --file ./server/Dockerfile .
docker push gcr.io/gogolook-compass/moonkat-app:v1
kubectl apply -f ./server/deploy/deployment.yaml
kubectl apply -f ./server/deploy/service.yaml
kubectl apply -f ./server/deploy/ingress.yaml
