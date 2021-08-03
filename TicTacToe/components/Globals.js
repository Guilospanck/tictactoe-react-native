
import AsyncStorage from '@react-native-community/async-storage';

const GLOBALS = {
    STYLES: {
        versusAiAndPerson: {
            width: 300,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            elevation: 3
        }
    },
    DARK_MODE: {
        textColor: "#CDCCCF",
        primaryDark: '#2E2E30',
        primaryLight: '#515052',
        primaryLighter: '#717072',
        secondary: '#AC5C5C'
    },
    LIGHT_MODE: {
        textColor: '#000000',
        primaryLight: '#6200EE',
        primaryDark: '#3700B3',
        secondary: '#03DAC5'
    },
    storeData: async function(key, value) {
        try{
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e){
            console.log(e);            
        }
    },
    getStoreData: async function(key) {
        let value = false;
        try {
            value = await AsyncStorage.getItem(key) || false;
        } catch (e) {
            console.log(e);            
        }
        return JSON.parse(value);
    }
};
export default GLOBALS;