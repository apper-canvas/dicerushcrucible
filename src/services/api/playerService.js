import { delay } from '../index'
import playersData from '../mockData/players.json'

class PlayerService {
  constructor() {
    this.players = [...playersData]
  }

  async getAll() {
    await delay(300)
    return [...this.players]
  }

  async getById(id) {
    await delay(250)
    const player = this.players.find(p => p.playerId === id)
    return player ? { ...player } : null
  }

  async create(playerData) {
    await delay(350)
    const newPlayer = {
      playerId: `player-${Date.now()}`,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      isActive: true,
      joinedAt: new Date().toISOString(),
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        winRate: 0,
        totalPlayTime: 0
      },
      ...playerData
    }
    this.players.push(newPlayer)
    return { ...newPlayer }
  }

  async update(id, playerData) {
    await delay(300)
    const index = this.players.findIndex(p => p.playerId === id)
    if (index !== -1) {
      this.players[index] = { ...this.players[index], ...playerData, updatedAt: new Date().toISOString() }
      return { ...this.players[index] }
    }
    throw new Error('Player not found')
  }

  async delete(id) {
    await delay(250)
    const index = this.players.findIndex(p => p.playerId === id)
    if (index !== -1) {
      const deletedPlayer = this.players.splice(index, 1)[0]
      return { ...deletedPlayer }
    }
    throw new Error('Player not found')
  }

  async getActivePlayers() {
    await delay(200)
    return this.players.filter(p => p.isActive).map(p => ({ ...p }))
  }

  async updatePlayerStats(id, stats) {
    await delay(300)
    const index = this.players.findIndex(p => p.playerId === id)
    if (index !== -1) {
      this.players[index].stats = { ...this.players[index].stats, ...stats }
      return { ...this.players[index] }
    }
    throw new Error('Player not found')
  }
}

export default new PlayerService()