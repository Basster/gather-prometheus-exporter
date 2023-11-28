import 'dotenv/config'
import { Player } from '@gathertown/gather-game-client'

export const GATHER_SPACE_NAME = String(process.env.GATHER_SPACE_NAME)
export const GATHER_API_KEY = String(process.env.GATHER_API_KEY)

export type ActivePlayers = (Player | undefined)[]
