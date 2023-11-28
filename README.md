# Gather Prometheus Exporter

Export [Gather](https://gather.town) Statistics to [Prometheus](https://prometheus.io/)

Metrics are retrieved using
the [Gather Websocket API](https://gathertown.notion.site/Gather-Websocket-API-bf2d5d4526db412590c3579c36141063).

To run it:

```shell
yarn --pure-lockfile
yarn start:dev
```

There is also a [Docker image](https://hub.docker.com/r/djbasster/gather-prometheus-exporter) available:

```
docker pull djbasster/gather-prometheus-exporter:latest
docker run --rm \
     -e GATHER_API_KEY=my-api-key \
     -e GATHER_SPACE_NAME="<Gather-Space-ID>" \
     -p "9991:9991" \
     djbasster/gather-prometheus-exporter:latest
```

Now open <http://localhost:9991/metrics> in your Browser and configure prometheus accordingly.

## Exported Metrics

| Metric              | Description                                         |
|---------------------|-----------------------------------------------------|
| gather_up           | Was the last Gather API query successful            |
| gather_active_users | How many users are currently connected to the space |

## Environment Variables

You can configure the exporter with the following environment variables.
For development, you can place a `.env` file in the repository root.

```
# Generate an API key for yourself at https://gather.town/apiKeys
GATHER_API_KEY=<Gather-Api-Key>
GATHER_SPACE_NAME=<Space-ID>
REFRESH_MINUTES=5
SERVER_PORT=9991
```

## Notice

A big thanks 🙇 to [teamzerolabs/covid_exporter](https://github.com/teamzerolabs/covid_exporter) for code inspiration.
