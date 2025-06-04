import React from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-sm shadow-soft border-b border-white/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
                <ApperIcon name="Dices" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DiceRush
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Classic Ludo Game</p>
              </div>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <motion.button 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                How to Play
              </motion.button>
              <motion.button 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Leaderboard
              </motion.button>
              <motion.button 
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg font-medium shadow-card hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Profile
              </motion.button>
            </nav>

            <motion.button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="Menu" className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="py-8 sm:py-12 lg:py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-heading font-bold text-gray-900 mb-4 sm:mb-6">
              Roll the Dice,{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Race to Victory
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
              Experience the classic Ludo game like never before with stunning visuals, 
              smooth animations, and multiplayer fun that brings friends together.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button 
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-heading font-semibold text-lg shadow-card hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Play" className="w-6 h-6" />
              <span>Quick Play</span>
            </motion.button>
            <motion.button 
              className="w-full sm:w-auto bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-heading font-semibold text-lg shadow-card hover:shadow-lg hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Users" className="w-6 h-6" />
              <span>Create Room</span>
            </motion.button>
          </motion.div>

          {/* Game Stats */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: "Users", label: "Players Online", value: "2,847" },
              { icon: "Trophy", label: "Games Played", value: "15,392" },
              { icon: "Clock", label: "Avg Game Time", value: "12 min" },
              { icon: "Star", label: "Rating", value: "4.9/5" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="glass-effect p-4 sm:p-6 rounded-xl shadow-card text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <ApperIcon name={stat.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Game Feature */}
      <MainFeature />

      {/* Features Section */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 bg-white/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Choose DiceRush?
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Modern gameplay meets classic fun with features designed for the ultimate Ludo experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "Zap",
                title: "Lightning Fast",
                description: "Smooth gameplay with zero lag and instant responses for the best gaming experience."
              },
              {
                icon: "Shield",
                title: "Fair Play",
                description: "Advanced anti-cheat system ensures every game is fair and competitive for all players."
              },
              {
                icon: "Smartphone",
                title: "Cross Platform",
                description: "Play seamlessly across all devices - mobile, tablet, or desktop with synchronized progress."
              },
              {
                icon: "MessageCircle",
                title: "Chat & Emotes",
                description: "Communicate with opponents using chat messages and fun emotes during gameplay."
              },
              {
                icon: "BarChart3",
                title: "Statistics",
                description: "Track your progress with detailed statistics, achievements, and personal records."
              },
              {
                icon: "Palette",
                title: "Customizable",
                description: "Personalize your gaming experience with custom themes, boards, and token designs."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="glass-effect p-6 sm:p-8 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-heading font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-8 sm:py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Dices" className="w-6 h-6 text-white" />
                </div>
                <h5 className="text-xl font-heading font-bold">DiceRush</h5>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The ultimate digital Ludo experience that brings the classic board game to life 
                with modern features and endless fun.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "Youtube"].map((social) => (
                  <motion.button 
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ApperIcon name={social} className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <h6 className="font-heading font-semibold mb-4">Game</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How to Play</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tournament</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-heading font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400">
            <p>&copy; 2024 DiceRush. All rights reserved. Made with ❤️ for game lovers.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home