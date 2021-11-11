# TUM-GI IoT Stack

This repo contains the TUM-GI IoT Stack consists of:

* **FROST-Server**: Access and store sensor data and IoT metadata based on the SensorThingsAPI.
* **Grafana**: Visualize timeseries and other data in the Browser.
* **Node-RED**: Connect and translate between sensor data platforms and the SensorThingsAPI.
* **Caddy**: Reverse proxy and automated SSL provider

## Requirements

* Docker: https://www.docker.com/
* Docker compose: https://docs.docker.com/compose/cli-command/#installing-compose-v2
* Docker swarm: https://docs.docker.com/engine/swarm/
  * Run `docker swarm --init` to initialize as single node swarm on your Docker host
  * For more advanced setups, e.g. with multiple nodes see: https://docs.docker.com/engine/swarm/

## Setup

### Create volumes

```shell
docker volume create caddy_config
docker volume create caddy_data
docker volume create grafana_data
docker volume create grafana_config
docker volume create frost_db_data
docker volume create nodered_data
```

### Configuration

First, clone this repo and switch to the cloned folder. The folder name will be used as name for
this stock in Docker.

```shell
git clone https://github.com/tum-gis/tum-gis-iot-stack-basic.git myStackname
cd myStackname
```

Edit `.env` according to your needs. Make sure `DOMAIN`, `FROST_BASEURL`, `GRAFANA_BASEURL` are set
correctly. `DOMAIN` will usually be part of `FROST_BASEURL` and `GRAFANA_BASEURL`:

```shell
DOMAIN=example.de
FROST_BASEURL=https://example.de/frost
GRAFANA_BASEURL=https://example.de/grafana
```

The suburl, e.g. `/frost` for FROST-Server, need to be compatible with the reverse proxy settings in
`docker-compose.yml`:

```yml
  frost-web:

    # ...
    # ...

    labels:
      caddy: "${DOMAIN:?DOMAIN not set}"
      caddy.handle_path: "/frost/*"
      caddy.handle_path.0_rewrite: "* /FROST-Server{uri}"
      caddy.handle_path.1_reverse_proxy: "{{upstreams http 8080}}"
      caddy.redir: "/frost /frost/"
```

Other configurations are described here: https://github.com/lucaslorentz/caddy-docker-proxy

### Start containers

```shell
docker compose up --build -d
```