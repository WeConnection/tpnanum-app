import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import LoginView from './compo/loginview';

const MainView = () => {
  const [state, setState] = React.useState('feed');

  return(
    <View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>state: {state}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
      }}>
        <TouchableHighlight onPress={() => setState('feed')}>
          <Image source={require('./assets/favicon.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setState('org')}>
          <Image source={require('./assets/favicon.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setState('notice')}>
          <Image source={require('./assets/favicon.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setState('profile')}>
          <Image source={require('./assets/favicon.png')} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default function App() {
  const target = AsyncStorage.getItem('username') ? <LoginView /> : <MainView />;

  return (
    <View style={styles.container}>
      {target}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
