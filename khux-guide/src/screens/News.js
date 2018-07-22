import React, { Component } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { latest } from '../newsApiCaller'
import HTML from 'react-native-render-html'

export default class News extends Component {
    static navigationOptions = {
        title: 'Latest News',
    }

    constructor(props) {
        super(props)
        this.state = {
            news: ''
        }
    }

    componentDidMount() {
        this._fetchNews()
    }

    _fetchNews = () => {
        latest()
            .then(news => this.setState({ news }))
            .catch(console.log)
    }

    _navigateToSelectedNews = (news) => {
        this.props.navigation.navigate('SelectedNews', news)
    }

    render = () => {
        const { news } = this.state
        return (
            <View>
                <FlatList
                    style={ styles.container }
                    data={ news }
                    keyExtractor={ (oneNews) => oneNews.detailsPage }
                    renderItem={ ({ item }) =>
                        <TouchableOpacity
                            onPress={ () => this._navigateToSelectedNews(item) }
                            style={{
                                margin: 10,
                                flexDirection: 'row',
                            }}
                        >
                            <Text> { item.date } - </Text>
                            <HTML html={item.title} />
                        </TouchableOpacity>
                    }
                />
            </View>
          )
    }
}

const styles = StyleSheet.create({
    container: {
    },
});