import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Text } from 'react-native'
import MedalFilter from './src/screens/MedalFilter'
import News from './src/screens/News'
import FilterModal from './src/components/FilterModal'

const MainStack = createStackNavigator({
  Home: {
    screen: MedalFilter,
    navigationOptions: {
      header: null
    }
  },
})

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    MyModal: {
      screen: FilterModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const NewsStack = createStackNavigator({
  Latest: {
    screen: News,
  },
})

export default createBottomTabNavigator({
  News: NewsStack,
  Medals: RootStack,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state
      if (routeName === 'Medals') {
        return <Text>{ '★' }</Text>
      } else if (routeName === 'News') {
        return <Text>{ '📰' }</Text>
      }
    },
  })
})