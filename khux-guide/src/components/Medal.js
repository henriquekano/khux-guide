import React, { Component } from 'react';
import {
  StyleSheet, Image, View, Text
} from 'react-native';

export default class Medal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      medal: this.props.medal
    }
  }

  translateTargetsImage = () =>{
    const { medal } = this.state
    
    switch(medal.targets.toLowerCase()) {
      case 'single':
        return require('../resources/imgs/single.png')
      case 'all':
        return require('../resources/imgs/all.png')
      default:
        return require('../resources/imgs/single.png')
    }
  }

  translateTierToImage = () => {
    const { medal } = this.state
    
    switch(medal.tier) {
      case 1:
        return require('../resources/imgs/tier1.png')
      case 2:
        return require('../resources/imgs/tier2.png')
      case 3:
        return require('../resources/imgs/tier3.png')
      case 4:
        return require('../resources/imgs/tier4.png')
      case 5:
        return require('../resources/imgs/tier5.png')
      case 6:
        return require('../resources/imgs/tier6.png')
      case 7:
        return require('../resources/imgs/tier7.png')
      case 8:
        return require('../resources/imgs/tier8.png')
      default:
        return require('../resources/imgs/tier1.png')
    }
  }

  translateAttribute = () => {
    const { medal } = this.state
    
    switch(medal.element.toLowerCase()) {
      case 'magic':
        return require('../resources/imgs/magic.png')
      case 'power':
        return require('../resources/imgs/power.png')
      case 'speed':
        return require('../resources/imgs/speed.png')
      default:
        return require('../resources/imgs/magic.png')
    }
  }

  translateDirection = () => {
    const { medal } = this.state
    
    switch(medal.direction.toLowerCase()) {
      case 'upright':
        return require('../resources/imgs/upright.png')
      case 'reversed':
        return require('../resources/imgs/reverse.png')
      default:
        return require('../resources/imgs/magic.png')
    }
  }

  render() {
    const { medal } = this.state
    return (
      <View style={ styles.container }>
      
        <Text
          numberOfLines={ 2 }
          ellipsizeMode='tail'
          style={ styles.medalName }
        >
          { medal.rarity }★ { medal.name.toUpperCase() }
        </Text>

        <View style={ styles.infoContainer }>
          <View style={ styles.medalImages }>
            <Image
              source={ {uri: medal.image_link} }
              style={ styles.itemImageStyle }
            />
            <View style={ styles.medalImageSubtitle }>
              <Image
                source={ this.translateAttribute() }
                style={ styles.subtitleImage }
              />
              <Image
                source={ this.translateDirection() }
                style={ styles.subtitleImage }
              />
              <Image
                source={ this.translateTierToImage() }
                style={ styles.subtitleImage }
              />
              <Image
                source={ this.translateTargetsImage() }
                style={ styles.subtitleImage }
              />
            </View>
          </View>
          
          <View style={ styles.writtenInformation }>
            <Text>Multiplier: { medal.multiplier } </Text>
            <Text>Hits: { medal.hits }</Text>
            <Text>SP cost: { medal.cost }</Text>
            <Text>Strength: { medal.strength }</Text>
            <Text>Defense: { medal.defence }</Text>
          </View>
        </View>
      </View>
    )
  }
}

const smallImages = {
  width: 20,
  height: 20,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#5480CC',
    flexDirection: 'column'
  },
  infoContainer: {
    flexDirection: 'row'
  },
  medalImages: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  medalImageSubtitle: {
    flexDirection: 'row',
    flex: 1,
  },
  itemImageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  subtitleImage: {
    ...smallImages,
    resizeMode: 'contain',
  },
  medalName: {
    fontWeight: 'bold',
    flex: 1,
  },
  writtenInformation: {
    marginLeft: 10,
  }
})