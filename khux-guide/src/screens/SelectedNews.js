import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Dimensions,
    ScrollView,
} from 'react-native'
import HTML from 'react-native-render-html';

export default class SelectedNews extends Component {
    static navigationOptions = {
        title: 'Latest News',
    }

    constructor (props) {
        super(props)
        this.state = {
            newsHtml: ''
        }
    }

    componentDidMount () {
        const news = this.props.navigation.state.params
        fetch(news.detailsPage)
            .then(response => response.text())
            .then(response => {
                console.log(response)
                this.setState({
                    newsHtml: response
                })
                return response
            }
            )
            .then(html => console.log(html) || html)
    }

    render() {
        const {newsHtml} = this.state
        if (newsHtml) {
            return (
                <ScrollView style={{ flex: 1, padding: 10 }}>
                    <HTML html={newsHtml} imagesMaxWidth={Dimensions.get('window').width} />
                </ScrollView>
            )
        } else {
            return (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                    size='large'
                />
            )
        }
    }
}