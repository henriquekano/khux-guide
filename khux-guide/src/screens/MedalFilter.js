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
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={ () => navigation.navigate('MyModal') }
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