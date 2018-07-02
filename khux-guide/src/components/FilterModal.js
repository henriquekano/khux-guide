import React, { Component } from 'react'
import {
  View, Text, Button, StyleSheet, Image, TouchableOpacity
} from 'react-native'
import BooleanTouchableOpacity from '../components/BooleanTouchableOpacity'

export default class FilterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tierFilter: []
    }
  }

  componentWillUnmount() {
    const goBack = this.props.navigation.getParam('onGoBack', undefined)
    const { tierFilter } = this.state
    if (goBack) {
      goBack(tierFilter)
    }
  }

  _tierWasClickedCallback = (value) => {
    const {
      tierFilter: currentTierFilter
    } = this.state

    let newFilter = currentTierFilter
    if (!currentTierFilter.includes(value)) {
      newFilter = [
        ...currentTierFilter,
        value
      ]
    } else {
      newFilter = currentTierFilter
        .filter(item => item !== value)
    }

    this.setState({
      tierFilter: newFilter
    })
  }

  _renderSelectableImage = (props) => {
    const { value } = props
    return (
      <BooleanTouchableOpacity
        onPress={ () => this._tierWasClickedCallback(value) }
        key={ value }
      >
        <View style={ styles.selectableImageContainer }>
          <Image
            { ...props }
            style={ styles.selectableImage }
          />
        </View>
      </BooleanTouchableOpacity>
    )
  }

  _renderSelectableImages = () => {
    const tierImages = [
      require('../resources/imgs/tier1.png'),
      require('../resources/imgs/tier2.png'),
      require('../resources/imgs/tier3.png'),
      require('../resources/imgs/tier4.png'),
      require('../resources/imgs/tier5.png'),
      require('../resources/imgs/tier6.png'),
      require('../resources/imgs/tier7.png'),
      require('../resources/imgs/tier8.png'),
    ]

    return tierImages.map((image, index) =>
      this._renderSelectableImage({
        source: image,
        value: index + 1
      })
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Tier</Text>
        <View style={ styles.selectOneGroup } >
          { this._renderSelectableImages() }
        </View>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectOneGroup: {
    flexDirection: 'row',
  },
  selectableImageContainer: {
    elevation: 2,
    borderRadius: 5,
    padding: 10,
  },
  selectableImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }
})