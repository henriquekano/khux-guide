import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MedalFilter from './src/screens/MedalFilter'

export default createStackNavigator({
  Home: {
    screen: MedalFilter
  }
})