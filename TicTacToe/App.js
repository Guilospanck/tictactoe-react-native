/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Router,
  Scene
} from 'react-native-router-flux';

import Home from "./components/Home"
import Game from "./components/Game"
import Persons from "./components/Persons";
import Versus from "./components/Versus";
import DevicesList from "./components/DevicesList";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <StatusBar backgroundColor="#3700B3" />
        <Router>
          <Scene key="root" headerMode="none">
            <Scene key="home" component={Home} />
            <Scene key="game" component={Game} />
            <Scene key="persons" component={Persons} />
            <Scene key="versus" component={Versus} />
            <Scene key="devices" component={DevicesList} />
          </Scene>
        </Router>
      </Fragment >
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

