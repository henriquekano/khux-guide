import React, { Component } from 'react';
import {
  TouchableWithoutFeedback, View
} from 'react-native';

export default class BooleanTouchableOpacity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opacity: 1
        }
    }

    get PRESSED_OPACITY() {
        return 0.3
    }

    _applyNewOpacity = () => {
        const pressedOpacity = this.PRESSED_OPACITY
        const { opacity: currentOpacity } = this.state
        if (currentOpacity === pressedOpacity) {
            this.setState({
                opacity: 1
            })
        } else {
            this.setState({
                opacity: pressedOpacity
            })
        }
    }

    _mergedOnpress = () => {
        const { onPress: parentOnPress } = this.props

        this._applyNewOpacity()
        if (parentOnPress) {
            parentOnPress()
        }
    }

    render() {
        const { opacity } = this.state
        return (
            <TouchableWithoutFeedback
                { ...{
                    ...this.props,
                    onPress: this._mergedOnpress
                }}
            >
                <View
                    style={ {
                        opacity: opacity
                    } }
                >
                    { this.props.children }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}