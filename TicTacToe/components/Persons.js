import React, { Fragment, Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import GLOBALS from './Globals'
import TRANSLATIONS from './Translations';
import ArrowHeader from "./ArrowHeader";

import { Actions } from "react-native-router-flux";

export default class Persons extends Component {
    constructor() {
        super();
        this.state = {
            isDarkMode: false,
            player1: '',
            player2: ''
        }
    }

    componentDidMount() {
        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                isDarkMode: value
            });
        });     
    }


    onPlayPress = (value) => {
        if(value === 'PVP'){
            Actions.reset('versus', {
                player: this.state.player1 !== '' ? this.state.player1 : TRANSLATIONS.No_name,
            });
        } else {
            Actions.reset('game', {
                player1: this.state.player1 !== '' ? this.state.player1 : TRANSLATIONS.You,
                gameMode: 'AI'
            });
        }

        GLOBALS.storeData('player', this.state.player1 !== '' ? this.state.player1 : TRANSLATIONS.No_name)
        
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
                <ArrowHeader onSwitchChange={() => this.onSwitchChange()}  />

                <View style={this.state.isDarkMode ? stylesDarkMode.container : stylesLightMode.container}>

                    {this.props.selector === 'Versus' ?
                        (
                            <Fragment>
                                <Input
                                    inputContainerStyle={{ borderWidth: 1, borderRadius: 50 }}
                                    placeholder={" " + TRANSLATIONS.Insert_players_name}
                                    maxLength={11}
                                    leftIcon={
                                        <Icon
                                            name='user'
                                            size={24}
                                            color={this.state.isDarkMode ? '#fff' : '#6200EE'}
                                        />
                                    }
                                    inputStyle={this.state.isDarkMode ? stylesDarkMode.textInputs : stylesLightMode.textInputs}
                                    value={this.state.player1}
                                    onChangeText={(player1) => this.setState({ player1: player1 })}
                                />
                                <Button
                                    type="outline"
                                    title={TRANSLATIONS.PLAY}
                                    containerStyle={{ paddingTop: 10 }}
                                    buttonStyle={{ width: 200 }}
                                    onPress={() => this.onPlayPress('PVP')}
                                />

                            </Fragment>

                        ) : (
                            <Fragment>
                                <Input
                                    inputContainerStyle={{ borderWidth: 1, borderRadius: 50 }}
                                    placeholder={" " + TRANSLATIONS.Insert_players_name}
                                    maxLength={11}
                                    leftIcon={
                                        <Icon
                                            name='user'
                                            size={24}
                                            color={this.state.isDarkMode ? '#fff' : '#6200EE'}
                                        />
                                    }
                                    inputStyle={this.state.isDarkMode ? stylesDarkMode.textInputs : stylesLightMode.textInputs}
                                    value={this.state.player1}
                                    onChangeText={(player1) => this.setState({ player1: player1 })}
                                />

                                <Button
                                    type="outline"
                                    title={TRANSLATIONS.PLAY}
                                    containerStyle={{ paddingTop: 10 }}
                                    buttonStyle={{ width: 200 }}
                                    onPress={() => this.onPlayPress('OnlyAI')}
                                />
                            </Fragment>
                        )
                    }

                </View>
            </Fragment>
        );
    };

}

const stylesLightMode = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    textInputs: {
        color: '#000',
    }
});

const stylesDarkMode = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: GLOBALS.DARK_MODE.primaryLight,
        padding: 15
    },
    textInputs: {
        color: '#fff',
    }
});