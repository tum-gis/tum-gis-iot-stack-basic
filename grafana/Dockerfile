# Builder
ARG BASEIMAGE_TAG='7.5.10'
# https://hub.docker.com/r/grafana/grafana/tags/
FROM grafana/grafana-oss:${BASEIMAGE_TAG}

# Provisioning
# COPY dashboards.yml /etc/grafana/provisioning/dashboards/
# COPY dashboards /etc/grafana/provisioning/dashboards/
COPY datasources /etc/grafana/provisioning/datasources/

ENV GF_PATHS_PROVISIONING=/etc/grafana/provisioning/
