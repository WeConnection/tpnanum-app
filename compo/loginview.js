import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {hostaddr} from '../config'
import * as SecureStore from 'expo-secure-store';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUp = () => {
  return (
    <SafeAreaView>

    </SafeAreaView>
  );
};

const Restore = () => {
  return (
    <SafeAreaView>

    </SafeAreaView>
  );
};


const Home = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async() => {
    try{
      const loginHeaders = new Headers();
      loginHeaders.append('Content-Type', 'application/json');
      const res = await fetch(hostaddr + '/user/login', {
        method: 'POST',
        headers: loginHeaders,
        body: JSON.stringify({
          "username": username,
          "password": password,
        })
    });
    if(!res.ok){
      const msg = await res.text();

      Alert.alert(
        '로그인 실패',
        msg,
        [
          {
            text: '닫기',
            style: 'cancle',
          },
        ],
        {cancelable: false},
      );
    }
    else{
      AsyncStorage.setItem('username', username);
      await SecureStore.setItemAsync("session", res.headers.get("Set-Cookie"));
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      })
    }
  }catch(err){
      Alert.alert(
        '로그인 실패',
        String(err),
        [
          {
            text: '닫기',
            style: 'cancle',
          },
        ],
        {cancelable: false},
      );
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        width: 200,
        marginVertical: 100,
      }}>
        <Text style={{
            textAlign: 'center',
            fontSize: 60,
            marginVertical: 40,
        }}>
            Login
        </Text>
        <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder='아이디'
            onChangeText={text => setUsername(text)}
            value={username}
        />
        <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder='비밀번호'
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
        />
        <Button
            title='로그인'
            onPress={login}
        />
      </View>
      <View style={{
        marginVertical: 100,
      }}>
        <TouchableHighlight onPress={() => navigation.navigate('SignUp')}>
          <Text style={{
            marginVertical: 10,
            color: 'darkorange',
          }}>
            계정을 아직 만들지 않으셨나요?
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('Restore')}>
          <Text style={{
            marginVertical: 10,
            color: 'darkorange',
          }}>
            계정을 잃어버렸습니까?
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function LoginView({navigation}){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Restore" component={Restore} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});