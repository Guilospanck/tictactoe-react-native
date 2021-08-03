import React, { Fragment, Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    DeviceEventEmitter
} from 'react-native'

import { ListItem } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'react-native-elements';

import { Actions } from "react-native-router-flux";

import GLOBALS from './Globals'
import TRANSLATIONS from './Translations';
import ArrowHeader from "./ArrowHeader";
import NearbyConnections from './NearbyConnections';

import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';

export default class DevicesList extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            isDarkMode: false,
            endpointList: [],
            infoEndpointName: [],
            refreshing: false,
            deviceSelected: false,
            tryAgainDialogVisible: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                isDarkMode: value
            });
        });

        this.getEndpointListSubscription = DeviceEventEmitter.addListener('onEndpointFoundPopulateList', (e) => {
            let list = Object.keys(e); // get the endpointsId
            let info = Object.values(e); // getTheDiscoveryEndpointInfo(name)

            if (this._isMounted) {
                this.setState({
                    endpointList: list,
                    infoEndpointName: info
                });
            }
        });

        this.subscription = DeviceEventEmitter.addListener('onConnectionResult', (e) => {
            if (this._isMounted) this.setState({ deviceSelected: false });

            if (e.event === "Connected")
                Actions.reset('game', {
                    gameMode: 'versus',
                    player2: this.props.player2,
                    discovering: true,
                    advertising: false
                });
        });

        this.connectionErrorSubscription = DeviceEventEmitter.addListener('onConnectionError', (e) => {
            this.setState({ deviceSelected: false, tryAgainDialogVisible: true });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.getEndpointListSubscription.remove();
        this.subscription.remove();
        this.connectionErrorSubscription.remove();
    }

    onSwitchChange = () => {
        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                isDarkMode: value
            });
        });
    }

    requestConnection = (key) => {
        NearbyConnections.requestConnection(key);
    }

    handleRefresh = () => {
        if (this.state.deviceSelected === true) return;

        this.setState({ refreshing: true }, () => {

            NearbyConnections.getEndpointsList((endpointList) => {
                let list = Object.keys(endpointList); // get the endpointsId
                let info = Object.values(endpointList); // getTheDiscoveryEndpointInfo(name)
                this.setState({
                    endpointList: list,
                    infoEndpointName: info,
                    refreshing: false
                });
            });
        });
    }

    onDeviceClick = (item) => {
        if (this.state.deviceSelected === true) return;

        this.requestConnection(item);
        this.setState({ deviceSelected: true });
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
                    <Text style={[this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text, { marginBottom: 10, fontSize: 20 }]}>{TRANSLATIONS.List_of_devices}</Text>
                    <FlatList
                        data={this.state.endpointList}
                        renderItem={({ item, index }) => (
                            <ListItem
                                roundAvatar
                                title={this.state.infoEndpointName[index]}
                                subtitle={item}
                                chevron={true}
                                leftIcon={
                                    <Icon
                                        name='mobile'
                                        size={36}
                                        color={this.state.isDarkMode ? 'white' : 'black'}
                                    />
                                }
                                onPress={() => this.onDeviceClick(item)}
                                containerStyle={this.state.isDarkMode ? stylesDarkMode.container : stylesLightMode.container}
                                titleStyle={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}
                                subtitleStyle={this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text}
                                bottomDivider={true}
                                topDivider={true}
                                disabled={this.state.deviceSelected}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.handleRefresh()}
                        ListEmptyComponent={<View style={{ alignItems: "center", marginTop: 200 }}>
                            <Text style={[this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text, { fontSize: 20 }]}>{TRANSLATIONS.No_nearby_devices}</Text>
                            <Text style={[this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text, { fontSize: 14 }]}>{TRANSLATIONS.Swipe_down_to_update}</Text>
                        </View>}
                    />
                    <Fragment>
                        {this.state.deviceSelected ? (
                            // <View style={{ alignItems: "center", marginBottom: 10 }}><Text style={[this.state.isDarkMode ? stylesDarkMode.Text : stylesLightMode.Text, { fontSize: 20 }]}>{TRANSLATIONS.Connecting}</Text></View>
                            <ProgressDialog
                                visible={this.state.deviceSelected}
                                title={TRANSLATIONS.Connecting}
                                message={TRANSLATIONS.Please_wait}
                            />
                        ) : (
                                <Fragment></Fragment>
                            )}
                    </Fragment>
                </View>
            </Fragment>
        )
    }
}

const stylesLightMode = StyleSheet.create({
    container: {
        flex: 1
    },
    Text: {
        color: GLOBALS.LIGHT_MODE.textColor
    }
});

const stylesDarkMode = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GLOBALS.DARK_MODE.primaryLight
    },
    Text: {
        color: GLOBALS.DARK_MODE.textColor
    }
})