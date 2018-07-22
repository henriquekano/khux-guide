import React, { PureComponent } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Dimensions,
    ScrollView,
} from 'react-native'
import moment from 'moment-timezone'

const PST_TIMEZONE = 'America/Los_Angeles'

export default class Clock extends PureComponent {
    constructor (props) {
        super(props)
        this.state = {
            time: this._getTime()
        }
    }

    componentDidMount () {
        this.interval = setInterval(() => {
            this.setState({
                time: this._getTime()
            })
        }, 1000)
    }

    componentWillUnmount () {
        clearInterval(this.interval)
    }

    _getTime = () => {
        return moment().tz(PST_TIMEZONE).format('HH:mm:ss')
    }

    render () {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.text}>PST 🕒 {this.state.time}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#640185',
        borderRadius: 5,
        padding: 5,
    },
})