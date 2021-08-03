import React, { Fragment, Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    DeviceEventEmitter
} from 'react-native'

import { Actions } from "react-native-router-flux";

import GLOBALS from './Globals'
import TRANSLATIONS from "./Translations";
import ArrowHeader from "./ArrowHeader";
import NearbyConnections from './NearbyConnections';

import { Dialog } from 'react-native-simple-dialogs';
import { Button } from 'react-native-elements';

export default class Versus extends Component {
    constructor() {
        super();
        this.state = {
            isDarkMode: false,
            advertising: false,
            discovering: false,
            tryAgainDialogVisible: false
        }
        NearbyConnections.disconnect();
    }

    componentDidMount() {
        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                isDarkMode: value,
                advertising: false,
                discovering: false
            });
        });

        NearbyConnections.disconnect();

        /** If there is a disconnection in the game, the device returns to advertising or discovering mode */
        if (this.props.fromGameDisconnected) {
            if (this.props.advertising) this.startAdvertising();
            if (this.props.discovering) this.startDiscovery();
        }

        /** This will listen only on the discovering device */
        this.subscription = DeviceEventEmitter.addListener('onEndpointFound', (e) => {
            if (!this.props.player) {
                GLOBALS.getStoreData('player').then((value) => {
                    if (e.event === "EndpointFound")
                        Actions.reset('devices', {
                            player2: value
                        });
                });
            } else {
                if (e.event === "EndpointFound")
                    Actions.reset('devices', {
                        player2: this.props.player
                    });
            }
        });

        /** This will listen on both devices. But, as discovering is in another screen ('devicesList')
         * we only apply the action.game() to the advertiser
         */
        this.connectionSubscription = DeviceEventEmitter.addListener('onConnectionResult', (e) => {
            if (e.event === "Connected") {
                if (this.state.advertising && !this.state.discovering) { // because the discovering will go to the Game screen from the device list
                    if (!this.props.player) {
                        GLOBALS.getStoreData('player').then((value) => {
                            Actions.reset('game', {
                                gameMode: 'versus',
                                player1: value,
                                advertising: true,
                                discovering: false
                            });
                        });
                    } else {
                        Actions.reset('game', {
                            gameMode: 'versus',
                            player1: this.props.player,
                            advertising: true,
                            discovering: false
                        });
                    }
                }
            }
        });

        /** Manages if there is some failure on the Advertising or Discovering listeners */
        this.failureAdvertisingOrDiscoveringSubscription = DeviceEventEmitter.addListener('onFailureOfAdvertisingOrDiscovering', (e) => {
            NearbyConnections.disconnect();
            this.setState({ tryAgainDialogVisible: true, advertising: false, discovering: false });
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
        this.connectionSubscription.remove();
        this.failureAdvertisingOrDiscoveringSubscription.remove();
    }

    onSwitchChange = () => {
        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                isDarkMode: value
            });
        });
    }

    startDiscovery = () => {
        NearbyConnections.disconnect();
        NearbyConnections.startDiscovery((success) => {

            if (success === 'success')
                this.setState({ discovering: true, advertising: false });
        });
    }

    startAdvertising = () => {
        NearbyConnections.disconnect();

        if (!this.props.player) {
            GLOBALS.getStoreData('player').then((value) => {
                NearbyConnections.startAdvertising(value, (success) => {
                    if (success === "Success")
                        this.setState({ advertising: true, discovering: false });
                });
            });
        } else {
            NearbyConnections.startAdvertising(this.props.player, (success) => {
                if (success === "Success")
                    this.setState({ advertising: true, discovering: false });
            });
        }
    }

    render() {
        return (
            <Fragment>
                <ArrowHeader onSwitchChange={() => this.onSwitchChange()} />

                {/* Try again dialog */}
                <Dialog
                    visible={this.state.tryAgainDialogVisible}
                    title={TRANSLATIONS.Connection_Error}
                    onTouchOutside={() => this.setState({ tryAgainDialogVisible: false })} >
                    <View>
                        <View style={{ justifyContent: "center" }}>
                            <Text>{TRANSLATIONS.Try_again}</Text>
                        </View>
                        <View style={{ marginTop: 7, alignItems: "center" }}>
                            <Button
                                type="outline"
                                title="OK"
                                containerStyle={{ paddingTop: 0 }}
                                buttonStyle={{ width: 100 }}
                                onPress={() => this.setState({ tryAgainDialogVisible: false })}
                            />
                        </View>
                    </View>
                </Dialog>

                <View style={this.state.isDarkMode ? stylesDarkMode.container : stylesLightMode.container}>

                    {this.state.discovering ? (
                        <TouchableOpacity
                            style={this.state.isDarkMode ? stylesDarkMode.versusPerson : stylesLightMode.versusPerson}
                        >
                            <Text style={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}>{TRANSLATIONS.Discovering}</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity
                                style={this.state.isDarkMode ? stylesDarkMode.versusPerson : stylesLightMode.versusPerson}
                                onPress={() => this.startDiscovery()}>
                                <Text style={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}>{TRANSLATIONS.Find_active_games}</Text>
                            </TouchableOpacity>
                        )}

                    {this.state.advertising ? (
                        <TouchableOpacity
                            style={[this.state.isDarkMode ? stylesDarkMode.versusPerson : stylesLightMode.versusPerson, { marginTop: 10 }]}
                        >
                            <Text style={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}>{TRANSLATIONS.Waiting_for_players}</Text>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity
                                style={[this.state.isDarkMode ? stylesDarkMode.versusPerson : stylesLightMode.versusPerson, { marginTop: 10 }]}
                                onPress={() => this.startAdvertising()}>
                                <Text style={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}>{TRANSLATIONS.Wait_for_players}</Text>
                            </TouchableOpacity>
                        )}

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