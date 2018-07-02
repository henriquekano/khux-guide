import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MedalFilter from './src/screens/MedalFilter'
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


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}