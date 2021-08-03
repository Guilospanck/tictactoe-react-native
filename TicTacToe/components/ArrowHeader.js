import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch
} from 'react-native'

import {
    Actions
} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

import GLOBALS from './Globals'
import TRANSLATIONS from './Translations';


export default class ArrowHeader extends Component {
    constructor() {
        super();
        this.state = {
            switchValue: false
        }
    }

    componentDidMount() {
        GLOBALS.getStoreData('darkMode').then((value) => {
            this.setState({
                switchValue: value
            });
        });
    }


    toggleSwitch = (value) => {
        this.setState({
            switchValue: value
        });
        GLOBALS.storeData('darkMode', value);
        this.props.onSwitchChange();
    }

    goBack() {
        Actions.reset("home");
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => this.goBack()}>
                        <Icon
                            name='chevron-left'
                            size={30}
                            color='white'
                            style={styles.arrowBack}
                        />
                    </TouchableOpacity>

                </View>
                <Text style={styles.title}>
                    {TRANSLATIONS.TIC_TAC_TOE}
                </Text>
                <View style={styles.toggle}>
                    <View>
                        <TouchableOpacity onPress={() => this.toggleSwitch(false)}>
                            {/* <Text style={styles.day}>☀</Text> */}
                            <Icon
                                name='sun-o'
                                size={25}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Switch
                            onValueChange={(value) => this.toggleSwitch(value)}
                            value={this.state.switchValue}
                            trackColor={{ true: GLOBALS.DARK_MODE.primaryLighter, false: 'white' }}
                            thumbColor={GLOBALS.DARK_MODE.primaryLight}
                            style={this.state.switchValue ? styles.switchEnableBorder : styles.switchDisableBorder} />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.toggleSwitch(true)}>
                            {/* <Text style={styles.night}>☾</Text> */}
                            <Icon
                                name='moon-o'
                                size={25}
                                color='black'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: '#6200EE',
        flexDirection: 'row'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
    },
    switchEnableBorder: {
        borderColor: '#6fa6d3',
        borderWidth: 1
    },
    switchDisableBorder: {
        borderColor: '#f2f2f2',
        borderWidth: 1,
    },
    toggle: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        marginRight: 10
    },
    arrowBack: {
        marginLeft: 10,
        marginTop: 10
    }
})