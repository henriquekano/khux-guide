import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { filterItens } from './src/khuxbotApiCaller'
import { FlatList } from 'react-native-gesture-handler';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itens: []
    }
  }

  componentDidMount() {
    this.loadMedals()
      .then(console.log('yay'))
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
}

  render() {
    const { itens } = this.state
    console.log(itens)
    return (
      <View style={ styles.container }>
        <FlatList
          data={ itens }
          keyExtractor={ (item) => item.id.toString() }
          renderItem={ ({item}) => 
            <Image
              source={ {uri: item.image_link} }
              style={ styles.itemImageStyle }
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  itemImageStyle: {
    width: 100,
    height: 100
  }
});
