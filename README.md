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

### Create external volumes (recommended, not mandatory)

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
this stack in Docker.

```shell
git clone https://github.com/tum-gis/tum-gis-iot-stack-basic.git myStackname
cd myStackname
```

Edit `.env` according to your needs. Make sure to set `DOMAIN` to
your DNS name, e.g. mydomain.com. For local testing use `localhost`.
`ADMIN_EMAIL` is only used for notifications regarding automated SSL
certificate management.

Use the `*_SUBPATH` variables to
set the url subpath, where the services should be available.
For instance, if you set `FROST_SUBPATH` to `/frost` the FROST-Server
will be available at: `https://DOMAIN/FROST_SUBPATH`, https://mydomain.com/frost.

### Start containers

After the configuration is finished, you can bring up the stack
using `docker compose`.

```shell
docker compose up --build -d
```

When the stack has fully booted, the services are available at:

* FROST-Server: https://DOMAIN/FROST_SUBPATH
* Node-RED: https://DOMAIN/NODERED_SUBPATH
* Grafana: https://DOMAIN/GRAFANA_SUBPATH

Run `docker compose ps` to check the health status of the stack. All services should be listed as *healthy*.

```

❯ docker compose ps
NAME                                  COMMAND                  SERVICE             STATUS              PORTS
myStackname-caddy-1       "/bin/caddy docker-p…"   caddy               running (healthy)   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
myStackname-frost-db-1    "docker-entrypoint.s…"   frost-db            running (healthy)   5432/tcp
myStackname-frost-web-1   "catalina.sh run"        frost-web           running (healthy)   0.0.0.0:1883->1883/tcp
myStackname-grafana-1     "/run.sh"                grafana             running (healthy)   3000/tcp
myStackname-nodered-1     "npm --no-update-not…"   nodered             running (healthy)   1880/tcp
```
