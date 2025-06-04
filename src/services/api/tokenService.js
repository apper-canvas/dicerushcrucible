import { delay } from '../index'
import tokensData from '../mockData/tokens.json'

class TokenService {
  constructor() {
    this.tokens = [...tokensData]
  }

  async getAll() {
    await delay(200)
    return [...this.tokens]
  }

  async getById(id) {
    await delay(150)
    const token = this.tokens.find(t => t.tokenId === id)
    return token ? { ...token } : null
  }

  async create(tokenData) {
    await delay(250)
    const newToken = {
      tokenId: `token-${Date.now()}`,
      position: -1,
      isHome: false,
      isSafe: false,
      createdAt: new Date().toISOString(),
      ...tokenData
    }
    this.tokens.push(newToken)
    return { ...newToken }
  }

  async update(id, tokenData) {
    await delay(200)
    const index = this.tokens.findIndex(t => t.tokenId === id)
    if (index !== -1) {
      this.tokens[index] = { ...this.tokens[index], ...tokenData, updatedAt: new Date().toISOString() }
      return { ...this.tokens[index] }
    }
    throw new Error('Token not found')
  }

  async delete(id) {
    await delay(150)
    const index = this.tokens.findIndex(t => t.tokenId === id)
    if (index !== -1) {
      const deletedToken = this.tokens.splice(index, 1)[0]
      return { ...deletedToken }
    }
    throw new Error('Token not found')
  }

  async getTokensByPlayer(playerId) {
    await delay(200)
    return this.tokens.filter(t => t.playerId === playerId).map(t => ({ ...t }))
  }

  async moveToken(id, newPosition) {
    await delay(300)
    const index = this.tokens.findIndex(t => t.tokenId === id)
    if (index !== -1) {
      this.tokens[index].position = newPosition
      this.tokens[index].updatedAt = new Date().toISOString()
      
      // Update token state based on position
      if (newPosition >= 52) {
        this.tokens[index].isHome = true
      }
      
      const safeZones = [1, 9, 14, 22, 27, 35, 40, 48]
      this.tokens[index].isSafe = safeZones.includes(newPosition)
      
      return { ...this.tokens[index] }
    }
    throw new Error('Token not found')
  }
}

export default new TokenService()