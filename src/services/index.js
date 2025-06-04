// Central exports for all services
export { default as gameService } from './api/gameService'
export { default as playerService } from './api/playerService'
export { default as tokenService } from './api/tokenService'

// Helper function for simulating API delays
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))