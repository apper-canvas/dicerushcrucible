import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import gameService from '../services/api/gameService'
import playerService from '../services/api/playerService'

const MainFeature = () => {
  const [games, setGames] = useState([])
  const [players, setPlayers] = useState([])
  const [currentGame, setCurrentGame] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [gameLoading, setGameLoading] = useState(false)
  const [diceValue, setDiceValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [selectedToken, setSelectedToken] = useState(null)
  const [gamePhase, setGamePhase] = useState('lobby') // lobby, playing, finished

  // Initialize game data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [gamesResult, playersResult] = await Promise.all([
          gameService.getAll(),
          playerService.getAll()
        ])
        setGames(gamesResult || [])
        setPlayers(playersResult || [])
      } catch (err) {
        setError(err?.message || 'Failed to load game data')
        toast.error('Failed to load game data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Create new game
  const createNewGame = async () => {
    setGameLoading(true)
    try {
      const selectedPlayers = players?.slice(0, 4) || []
      const newGame = await gameService.create({
        players: selectedPlayers.map((player, index) => ({
          ...player,
          color: ['red', 'blue', 'green', 'yellow'][index],
          tokens: Array.from({ length: 4 }, (_, tokenIndex) => ({
            tokenId: `${player?.playerId || 'player'}-token-${tokenIndex}`,
            position: -1, // -1 means in home zone
            isHome: false,
            isSafe: false
          }))
        })),
        currentTurn: selectedPlayers[0]?.playerId || 'player1',
        boardState: Array(56).fill(null),
        status: 'active'
      })
      
      setCurrentGame(newGame)
      setCurrentPlayer(0)
      setGamePhase('playing')
      toast.success('New game started! Roll the dice to begin!')
    } catch (err) {
      toast.error('Failed to create game')
    } finally {
      setGameLoading(false)
    }
  }

  // Roll dice
  const rollDice = async () => {
    if (isRolling) return
    
    setIsRolling(true)
    
    // Simulate dice roll animation
    const rollAnimation = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
    }, 100)
    
    setTimeout(() => {
      clearInterval(rollAnimation)
      const finalValue = Math.floor(Math.random() * 6) + 1
      setDiceValue(finalValue)
      setIsRolling(false)
      
      // Check if player can move
      const player = currentGame?.players?.[currentPlayer]
      if (player) {
        const canMove = player.tokens?.some(token => 
          token.position >= 0 || finalValue === 6
        )
        
        if (canMove) {
          toast.success(`Rolled ${finalValue}! Select a token to move.`)
        } else {
          toast.info(`Rolled ${finalValue}. No valid moves available.`)
          setTimeout(() => nextTurn(), 1500)
        }
      }
    }, 1000)
  }

  // Move token
  const moveToken = async (tokenId) => {
    if (!currentGame || isRolling) return
    
    try {
      const player = currentGame.players[currentPlayer]
      const tokenIndex = player?.tokens?.findIndex(t => t.tokenId === tokenId)
      
      if (tokenIndex === -1) return
      
      const token = player.tokens[tokenIndex]
      let newPosition = token.position
      
      // Handle token movement logic
      if (token.position === -1 && diceValue === 6) {
        // Move from home to start position
        newPosition = currentPlayer * 13 // Start position for each player
        toast.success('Token entered the board!')
      } else if (token.position >= 0) {
        // Move forward
        newPosition = token.position + diceValue
        if (newPosition > 55) {
          newPosition = 55 // Max position (home)
          token.isHome = true
          toast.success('Token reached home!')
        }
      }
      
      // Update game state
      const updatedGame = {
        ...currentGame,
        players: currentGame.players.map((p, index) => 
          index === currentPlayer 
            ? {
                ...p,
                tokens: p.tokens.map((t, tIndex) => 
                  tIndex === tokenIndex 
                    ? { ...t, position: newPosition }
                    : t
                )
              }
            : p
        )
      }
      
      setCurrentGame(await gameService.update(currentGame.gameId, updatedGame))
      
      // Check for win condition
      const allTokensHome = player.tokens.every(t => t.isHome)
      if (allTokensHome) {
        setGamePhase('finished')
        toast.success(`${player.playerName} wins the game!`)
        return
      }
      
      // Next turn if not rolled 6
      if (diceValue !== 6) {
        setTimeout(() => nextTurn(), 1000)
      } else {
        toast.info('Rolled 6! Take another turn!')
      }
      
    } catch (err) {
      toast.error('Failed to move token')
    }
  }

  // Next turn
  const nextTurn = () => {
    const nextPlayerIndex = (currentPlayer + 1) % (currentGame?.players?.length || 4)
    setCurrentPlayer(nextPlayerIndex)
    
    const nextPlayer = currentGame?.players?.[nextPlayerIndex]
    if (nextPlayer) {
      toast.info(`${nextPlayer.playerName}'s turn!`)
    }
  }

  // Render board cell
  const renderBoardCell = (index) => {
    const isStartPosition = [0, 13, 26, 39].includes(index)
    const isSafeZone = [1, 9, 14, 22, 27, 35, 40, 48].includes(index)
    
    // Find tokens on this cell
    const tokensOnCell = currentGame?.players?.flatMap(player => 
      player.tokens?.filter(token => token.position === index) || []
    ) || []
    
    return (
      <motion.div
        key={index}
        className={`
          w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border border-gray-300 relative flex items-center justify-center cursor-pointer
          ${isStartPosition ? 'bg-yellow-200 border-yellow-400' : ''}
          ${isSafeZone ? 'bg-green-100 border-green-400' : ''}
          ${tokensOnCell.length > 0 ? 'bg-blue-50' : 'bg-white'}
        `}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {isSafeZone && (
          <ApperIcon name="Star" className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-500 absolute top-0 right-0" />
        )}
        
        {tokensOnCell.map((token, tokenIndex) => {
          const player = currentGame?.players?.find(p => 
            p.tokens?.some(t => t.tokenId === token.tokenId)
          )
          return (
            <motion.div
              key={token.tokenId}
              className={`
                player-token rounded-full border-2 border-white shadow-token absolute
                ${player?.color === 'red' ? 'bg-players-red' : ''}
                ${player?.color === 'blue' ? 'bg-players-blue' : ''}
                ${player?.color === 'green' ? 'bg-players-green' : ''}
                ${player?.color === 'yellow' ? 'bg-players-yellow' : ''}
              `}
              style={{
                transform: `translate(${tokenIndex * 2}px, ${tokenIndex * 2}px)`,
                zIndex: tokenIndex + 1
              }}
              onClick={() => moveToken(token.tokenId)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 500,
                delay: tokenIndex * 0.1 
              }}
            />
          )
        })}
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-gray-600">Loading game...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
            Play DiceRush Now
          </h3>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the thrill of classic Ludo with modern gameplay mechanics and stunning visuals.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {gamePhase === 'lobby' && (
              <motion.div
                key="lobby"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="glass-effect p-8 sm:p-12 rounded-2xl shadow-game-board max-w-2xl mx-auto">
                  <motion.div
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ApperIcon name="Dices" className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </motion.div>
                  
                  <h4 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">
                    Ready to Play?
                  </h4>
                  <p className="text-gray-600 mb-8">
                    Start a new game with up to 4 players and experience the excitement of DiceRush!
                  </p>
                  
                  <motion.button
                    onClick={createNewGame}
                    disabled={gameLoading}
                    className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg shadow-card hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {gameLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Creating Game...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Play" className="w-6 h-6" />
                        <span>Start New Game</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {gamePhase === 'playing' && currentGame && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Game Header */}
                <div className="glass-effect p-4 sm:p-6 rounded-xl shadow-card">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <ApperIcon name="Trophy" className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-heading font-bold text-gray-900">
                          Game in Progress
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600">
                          {currentGame.players?.[currentPlayer]?.playerName || 'Player'}'s Turn
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => {
                        setGamePhase('lobby')
                        setCurrentGame(null)
                        setCurrentPlayer(0)
                        toast.info('Game ended')
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ApperIcon name="X" className="w-4 h-4" />
                      <span>End Game</span>
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Game Board */}
                  <div className="lg:col-span-2">
                    <motion.div 
                      className="game-board-container bg-white p-4 sm:p-6 rounded-2xl shadow-game-board mx-auto"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="game-board-grid bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-xl border-2 border-gray-200">
                        {/* Render 15x15 grid */}
                        {Array.from({ length: 225 }, (_, index) => {
                          const row = Math.floor(index / 15)
                          const col = index % 15
                          
                          // Home zones (corners)
                          if ((row < 6 && col < 6) || 
                              (row < 6 && col > 8) || 
                              (row > 8 && col < 6) || 
                              (row > 8 && col > 8)) {
                            const isRedZone = row < 6 && col < 6
                            const isBlueZone = row < 6 && col > 8
                            const isGreenZone = row > 8 && col < 6
                            const isYellowZone = row > 8 && col > 8
                            
                            return (
                              <motion.div
                                key={index}
                                className={`
                                  w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-sm flex items-center justify-center
                                  ${isRedZone ? 'bg-gradient-to-br from-red-200 to-red-300' : ''}
                                  ${isBlueZone ? 'bg-gradient-to-br from-blue-200 to-blue-300' : ''}
                                  ${isGreenZone ? 'bg-gradient-to-br from-green-200 to-green-300' : ''}
                                  ${isYellowZone ? 'bg-gradient-to-br from-yellow-200 to-yellow-300' : ''}
                                `}
                                whileHover={{ scale: 1.1 }}
                              >
                                {/* Home zone tokens */}
                                {currentGame.players?.map(player => 
                                  player.tokens?.filter(token => token.position === -1).map((token, tokenIndex) => {
                                    const shouldShow = (
                                      (isRedZone && player.color === 'red') ||
                                      (isBlueZone && player.color === 'blue') ||
                                      (isGreenZone && player.color === 'green') ||
                                      (isYellowZone && player.color === 'yellow')
                                    ) && tokenIndex === (Math.floor((row % 6) / 2) * 2 + Math.floor((col % 6) / 2))
                                    
                                    return shouldShow ? (
                                      <motion.div
                                        key={token.tokenId}
                                        className={`
                                          w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border border-white shadow-sm cursor-pointer
                                          ${player.color === 'red' ? 'bg-players-red' : ''}
                                          ${player.color === 'blue' ? 'bg-players-blue' : ''}
                                          ${player.color === 'green' ? 'bg-players-green' : ''}
                                          ${player.color === 'yellow' ? 'bg-players-yellow' : ''}
                                        `}
                                        onClick={() => moveToken(token.tokenId)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500 }}
                                      />
                                    ) : null
                                  })
                                )}
                              </motion.div>
                            )
                          }
                          
                          // Main path
                          const isMainPath = (row === 6 && col !== 6 && col !== 7 && col !== 8) ||
                                           (row === 8 && col !== 6 && col !== 7 && col !== 8) ||
                                           (col === 6 && row !== 6 && row !== 7 && row !== 8) ||
                                           (col === 8 && row !== 6 && row !== 7 && row !== 8)
                          
                          // Home stretch
                          const isHomeStretch = (row === 7 && (col > 0 && col < 6)) ||
                                              (row === 7 && (col > 8 && col < 14)) ||
                                              (col === 7 && (row > 0 && row < 6)) ||
                                              (col === 7 && (row > 8 && row < 14))
                          
                          // Center (finish)
                          const isCenter = row >= 6 && row <= 8 && col >= 6 && col <= 8
                          
                          if (isMainPath || isHomeStretch) {
                            // Calculate path position
                            let pathPosition = 0
                            if (row === 6 && col < 6) pathPosition = 5 - col
                            else if (col === 0 && row < 6) pathPosition = 6 + (5 - row)
                            else if (col === 0 && row > 8) pathPosition = 12 + (row - 9)
                            // ... more path calculations
                            
                            return renderBoardCell(pathPosition)
                          }
                          
                          if (isCenter) {
                            return (
                              <motion.div
                                key={index}
                                className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center rounded-sm"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ApperIcon name="Crown" className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-yellow-700" />
                              </motion.div>
                            )
                          }
                          
                          return (
                            <div 
                              key={index} 
                              className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gray-100"
                            />
                          )
                        })}
                      </div>
                    </motion.div>
                  </div>

                  {/* Game Controls */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Dice */}
                    <motion.div 
                      className="glass-effect p-6 rounded-xl shadow-card text-center"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h5 className="text-lg font-heading font-semibold text-gray-900 mb-4">
                        Roll the Dice
                      </h5>
                      
                      <motion.div 
                        className={`
                          dice-container mx-auto mb-4 bg-white rounded-xl shadow-dice flex items-center justify-center cursor-pointer
                          ${isRolling ? 'animate-dice-roll' : ''}
                          ${currentGame.players?.[currentPlayer] ? 'animate-pulse-glow' : ''}
                        `}
                        onClick={rollDice}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={isRolling ? { 
                          rotateX: [0, 360],
                          rotateY: [0, 720]
                        } : {}}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                          {diceValue}
                        </span>
                      </motion.div>
                      
                      <motion.button
                        onClick={rollDice}
                        disabled={isRolling}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold shadow-card hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isRolling ? 'Rolling...' : 'Roll Dice'}
                      </motion.button>
                    </motion.div>

                    {/* Player Status */}
                    <motion.div 
                      className="glass-effect p-6 rounded-xl shadow-card"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <h5 className="text-lg font-heading font-semibold text-gray-900 mb-4">
                        Players
                      </h5>
                      
                      <div className="space-y-3">
                        {currentGame.players?.map((player, index) => (
                          <motion.div
                            key={player.playerId}
                            className={`
                              p-3 rounded-lg border-2 transition-all duration-300
                              ${index === currentPlayer 
                                ? 'border-primary bg-primary/10 shadow-md' 
                                : 'border-gray-200 bg-white'
                              }
                            `}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`
                                  w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm
                                  ${player.color === 'red' ? 'bg-players-red' : ''}
                                  ${player.color === 'blue' ? 'bg-players-blue' : ''}
                                  ${player.color === 'green' ? 'bg-players-green' : ''}
                                  ${player.color === 'yellow' ? 'bg-players-yellow' : ''}
                                `}>
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">
                                    {player.playerName}
                                  </p>
                                  <p className="text-xs text-gray-500 capitalize">
                                    {player.color} Player
                                  </p>
                                </div>
                              </div>
                              
                              {index === currentPlayer && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <ApperIcon name="Clock" className="w-5 h-5 text-primary" />
                                </motion.div>
                              )}
                            </div>
                            
                            {/* Token status */}
                            <div className="mt-2 flex space-x-1">
                              {player.tokens?.map((token, tokenIndex) => (
                                <div
                                  key={token.tokenId}
                                  className={`
                                    w-2 h-2 rounded-full
                                    ${token.isHome ? 'bg-green-500' : 
                                      token.position >= 0 ? 'bg-yellow-500' : 'bg-gray-300'}
                                  `}
                                  title={`Token ${tokenIndex + 1}: ${
                                    token.isHome ? 'Home' : 
                                    token.position >= 0 ? 'On board' : 'Waiting'
                                  }`}
                                />
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {gamePhase === 'finished' && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <div className="glass-effect p-8 sm:p-12 rounded-2xl shadow-game-board max-w-2xl mx-auto">
                  <motion.div
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ApperIcon name="Trophy" className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </motion.div>
                  
                  <h4 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">
                    Game Finished!
                  </h4>
                  <p className="text-gray-600 mb-8">
                    Congratulations to the winner! Ready for another round?
                  </p>
                  
                  <motion.button
                    onClick={() => {
                      setGamePhase('lobby')
                      setCurrentGame(null)
                      setCurrentPlayer(0)
                    }}
                    className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg shadow-card hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ApperIcon name="RotateCcw" className="w-6 h-6" />
                    <span>Play Again</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <motion.div 
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ApperIcon name="AlertTriangle" className="w-5 h-5 inline mr-2" />
            {error}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default MainFeature