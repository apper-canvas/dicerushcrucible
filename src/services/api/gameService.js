import { delay } from '../index'
import gamesData from '../mockData/games.json'

class GameService {
  constructor() {
    this.games = [...gamesData]
  }

  async getAll() {
    await delay(300)
    return [...this.games]
  }

  async getById(id) {
    await delay(250)
    const game = this.games.find(g => g.gameId === id)
    return game ? { ...game } : null
  }

  async create(gameData) {
    await delay(400)
    const newGame = {
      gameId: `game-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...gameData
    }
    this.games.push(newGame)
    return { ...newGame }
  }

  async update(id, gameData) {
    await delay(300)
    const index = this.games.findIndex(g => g.gameId === id)
    if (index !== -1) {
      this.games[index] = { ...this.games[index], ...gameData, updatedAt: new Date().toISOString() }
      return { ...this.games[index] }
    }
    throw new Error('Game not found')
  }

  async delete(id) {
    await delay(250)
    const index = this.games.findIndex(g => g.gameId === id)
    if (index !== -1) {
      const deletedGame = this.games.splice(index, 1)[0]
      return { ...deletedGame }
    }
    throw new Error('Game not found')
  }

  async getActiveGames() {
    await delay(200)
    return this.games.filter(g => g.status === 'active').map(g => ({ ...g }))
  }

  async getGamesByPlayer(playerId) {
    await delay(250)
    return this.games.filter(g => 
      g.players && g.players.some(p => p.playerId === playerId)
    ).map(g => ({ ...g }))
  }
}

export default new GameService()