import { describe, afterEach, expect, it, jest } from '@jest/globals'
import { Player } from '@gathertown/gather-game-client'
import { generateDefaultPlayer } from '@gathertown/gather-game-common/dist/src/playerUtils'
import { collectMetrics } from '../data-fetcher'
import { gather_active_users, gather_up } from '../metrics'

const connectMock = jest.fn()
const waitForInitMock = jest.fn()
const disconnectMock = jest.fn()
const players: { [uid: string]: Player } = {}

jest.mock('@gathertown/gather-game-client', () => ({
  Game: jest.fn().mockImplementation(() => ({
    connect: connectMock,
    waitForInit: waitForInitMock,
    disconnect: disconnectMock,
    players: players,
  })),
}))

describe('collectMetrics', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch active users from gather api', async () => {
    process.env.GATHER_API_KEY = 'my-api-key'
    process.env.GATHER_SPACE_NAME = 'test-hash/my-space-name'

    const npc = generateDefaultPlayer('npc')
    npc.isNpc = true

    const offline = generateDefaultPlayer('offline')
    offline.connected = false

    const player = generateDefaultPlayer('mmustermann')
    player.name = 'Max Mustermann'

    players[npc.id] = npc
    players[offline.id] = offline
    players[player.id] = player

    await collectMetrics()

    const activeUsersGauge = await gather_active_users.get()
    expect(activeUsersGauge.values).toEqual([
      {
        labels: { space: 'test-hash/my-space-name', type: 'gather' },
        value: 1,
      },
    ])
    const gatherUpGauge = await gather_up.get()
    expect(gatherUpGauge.values).toEqual([
      {
        labels: { space: 'test-hash/my-space-name', type: 'gather' },
        value: 1,
      },
    ])
  })
})
