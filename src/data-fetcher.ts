import { Game } from '@gathertown/gather-game-client'
import { gather_active_users, gather_up } from './metrics'
import { ActivePlayers, GATHER_API_KEY, GATHER_SPACE_NAME } from './gather'

global.WebSocket = require('isomorphic-ws')

const fetchActiveUsers = async (): Promise<ActivePlayers> => {
  const game = new Game(GATHER_SPACE_NAME, () =>
    Promise.resolve({ apiKey: GATHER_API_KEY })
  )
  game.connect()
  await game.waitForInit()

  const players = game.players
  game.disconnect()

  const activePlayers: ActivePlayers = []

  Object.keys(players).forEach((key) => {
    const player = players[key]
    if (!player.isNpc && player.connected) {
      activePlayers.push(player)
    }
  })

  return Promise.resolve(activePlayers)
}

export const collectMetrics = async () => {
  const activeUsers = await fetchActiveUsers()
  if (activeUsers) {
    gather_active_users
      .labels({ type: 'gather', space: GATHER_SPACE_NAME })
      .set(activeUsers.length)
  }

  gather_up.labels({ type: 'gather', space: GATHER_SPACE_NAME }).set(1)

  console.log('Metrics refreshed!')
}
