import React, { Fragment, Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import { Actions } from "react-native-router-flux";

import GLOBALS from './Globals'
import TRANSLATIONS from './Translations';
import Header from "./Header";
import NearbyConnections from './NearbyConnections';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            isDarkMode: false
        }
    }

    componentDidMount() {
        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                isDarkMode: value
            });
        });

        NearbyConnections.disconnect();
    }

    onGameModeSelector = (value) => {
        Actions.reset('persons', {
            selector: value
        });
    }

    onSwitchChange = () => {
        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                isDarkMode: value
            });
        });
    }

    render() {
        return (
            <Fragment>
                <Header onSwitchChange={() => this.onSwitchChange()} />

                <View style={this.state.isDarkMode ? stylesDarkMode.container : stylesLightMode.container}>
                    <TouchableOpacity
                        style={this.state.isDarkMode ? stylesDarkMode.versusAi : stylesLightMode.versusAi}
                        onPress={() => this.onGameModeSelector('AI')}>
                        <Text style={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}>{TRANSLATIONS.AI}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.isDarkMode ? stylesDarkMode.versusPerson : stylesLightMode.versusPerson}
                        onPress={() => this.onGameModeSelector('Versus')}>
                        <Text style={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}>1 VS 1</Text>
                    </TouchableOpacity>
                </View>

            </Fragment>
        )
    }
}


const stylesLightMode = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    versusAi: {
        ...GLOBALS.STYLES.versusAiAndPerson, ...{
            marginBottom: 10,
            backgroundColor: 'white'
        }
    },
    versusPerson: {
        ...GLOBALS.STYLES.versusAiAndPerson, ...{
            backgroundColor: 'white'
        }
    },
    Text: {
        fontSize: 20,
        color: GLOBALS.LIGHT_MODE.textColor
    }
});

const stylesDarkMode = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: GLOBALS.DARK_MODE.primaryLight
    },
    versusAi: {
        ...GLOBALS.STYLES.versusAiAndPerson, ...{
            backgroundColor: GLOBALS.DARK_MODE.primaryLighter,
            marginBottom: 10
        }
    },
    versusPerson: {
        ...GLOBALS.STYLES.versusAiAndPerson, ...{
            backgroundColor: GLOBALS.DARK_MODE.primaryLighter
        }
    },
    Text: {
        fontSize: 20,
        color: GLOBALS.DARK_MODE.textColor
    }
})