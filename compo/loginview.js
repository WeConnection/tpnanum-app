import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import hostaddr from '../config'

export default function LoginView(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    props.onLogin();
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
        <TouchableHighlight>
          <Text style={{
            marginVertical: 10,
            color: 'darkorange',
          }}>
            계정을 아직 만들지 않으셨나요?
          </Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text style={{
            marginVertical: 10,
            color: 'darkorange',
          }}>
            계정을 잃어버렸습니까?
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});