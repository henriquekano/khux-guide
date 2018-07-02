import React, { Component } from 'react'
import {
    StyleSheet, View, TouchableOpacity, Text, Button
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { filterItens } from '../khuxbotApiCaller'
import Medal from '../components/Medal'

export default class MedalFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itens: [],
            filters: [5]
        }
    }

    componentDidMount() {
        const { filters } = this.state
        this.loadMedals(filters)
    }

    loadMedals = (filters) => {
        return filterItens(filters)
            .then(itens => {
                console.log(itens)
                this.setState({ itens })
            })
            .catch(console.log)
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

    render() {
        const { itens } = this.state
        return (
            <View style={styles.container}>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 23
    },
    filterInput: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
        elevation: 3,
    }
});