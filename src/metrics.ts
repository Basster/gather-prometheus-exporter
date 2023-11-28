import { Gauge } from 'prom-client'

export const gather_up = new Gauge({
  name: 'gather_up',
  help: 'Last Gather API request successful; type = [gather]',
  labelNames: ['type', 'space'],
})

export const gather_active_users = new Gauge({
  name: 'gather_active_users',
  help: 'Total number of active users in space; type = [gather]',
  labelNames: ['type', 'space'],
})
