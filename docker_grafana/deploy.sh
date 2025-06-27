docker build --rm -t orascope_grafana:7.5.17 .
docker rm -f grafana7_5_17
docker-compose -f docker-compose.yml up -d
