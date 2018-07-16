import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Dimensions,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { filterItens } from '../khuxbotApiCaller'
import Medal from '../components/Medal'

export default class MedalFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itens: [],
            filters: [5],
            loading: true,
        }
    }

    componentDidMount() {
        const { filters } = this.state
        this.loadMedals(filters)
    }

    loadMedals = (filters) => {
        this.setState({
            loading: true
        })
        return filterItens(filters)
            .then(itens => {
                this.setState({ itens,
                    loading: false
                })
            })
    }

    _fetchFilters = (filters) => {
        this.setState({ filters: filters })
        this.loadMedals(filters)
    }

    _showModal = () => {
        const { navigation } = this.props

        navigation.navigate(
            'MyModal', {
                onGoBack: this._fetchFilters
            }
        )
    }

    _renderBody = () => {
        if (this.state.loading) {
            return <View style={[ styles.container, {
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height,
            } ]}>
                <ActivityIndicator
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                    size='large'
                />
            </View>
        } else {
            const { itens } = this.state

            return <View style={styles.container}>
                <TouchableOpacity
                    onPress={ () => this._showModal() }
                >
                    <Text style={styles.filterInput}>
                        Filters
                    </Text>
                </TouchableOpacity>

                <FlatList
                    data={itens}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <Medal
                            medal={item}
                        />
                    }
                />
            </View>
        }
    }

    render = this._renderBody
}

const styles = StyleSheet.create({
    container: {
        marginTop: 23,
        marginBottom: 60,
    },
    filterInput: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
        elevation: 3,
    }
});