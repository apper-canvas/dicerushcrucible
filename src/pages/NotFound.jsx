import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ApperIcon name="Dices" className="w-16 h-16 text-white" />
        </motion.div>
        
        <motion.h1 
          className="text-6xl sm:text-8xl font-heading font-bold text-gray-900 mb-4"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-2xl sm:text-3xl font-heading font-semibold text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Game Not Found
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Oops! Looks like this page rolled off the board. Let's get you back to the game!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
<Link
            to="/"
            className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-3xl font-display font-normal text-xl shadow-ludo-dice hover:shadow-ludo-glow transition-all duration-300 group"
          >
            <ApperIcon name="Home" className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <span>Back to Game</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound