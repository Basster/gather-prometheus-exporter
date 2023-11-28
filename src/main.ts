import 'dotenv/config'
import express from 'express'
import promClient from 'prom-client'
import { collectMetrics } from './data-fetcher'

const refreshMinutes: number = Number(process.env.REFRESH_MINUTES) || 5
const serverPort: number = Number(process.env.SERVER_PORT) || 9991

promClient.collectDefaultMetrics()

console.log(
  `Hello folks. We will setup a process that hits an api every 5 minutes, and update prometheus metrics.`
)

setInterval(
  () => {
    collectMetrics()
  },
  refreshMinutes * 60 * 1000
)

collectMetrics()

const metricServer = express()
metricServer.get('/metrics', async (req, res) => {
  console.log('Scraped')
  res.type('text').send(await promClient.register.metrics())
})

metricServer.listen(serverPort, () =>
  console.log(
    `🚨 Prometheus listening on http://localhost:${serverPort}/metrics`
  )
)
