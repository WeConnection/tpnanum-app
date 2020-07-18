import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import hostaddr from '../config'

export default function LoginView() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    return fetch(hostaddr + '/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        password: password
      }),
    });
  }

  return (
    <View style={styles.container}>
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
        />
        <Button
            title='로그인'
            onPress={login}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
