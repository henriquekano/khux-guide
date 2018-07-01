import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { filterItens } from '../khuxbotApiCaller'
import Medal from '../components/Medal'

export default class MedalFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itens: []
    }
  }

  componentDidMount() {
    this.loadMedals()
  }

  loadMedals = () => {
    return filterItens({
      "filter": {
        "tier": {
          "min": 4,
          "max": 6
        }
      }
    })
    .then(itens => this.setState({ itens }))
    .catch(console.log)
}

  render() {
    const { itens } = this.state
    return (
      <View style={ styles.container }>
        <FlatList
          data={ itens }
          keyExtractor={ (item) => item.id.toString() }
          renderItem={ ({item}) => 
            <Medal
              medal={ item }
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});