import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Entypo, Octicons, AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from './compo/loginview';
import FeedView from './compo/feedview';
import OrgView from './compo/orgview';
import NoticeView from './compo/noticeview';
import ProfileView from './compo/profileview';

const MainView = () => {
  const [state, setState] = React.useState('feed');
  const target = {feed: <FeedView />, org: <OrgView />, notice: <NoticeView />, profile: <ProfileView />}[state];
  const title = {feed: '피드', org: '단체', notice: '알림', profile: '내정보'}[state];

  return(
    <View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'cornsilk',
      }}>
        <View style={{
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: 'white'
        }}>
          <Text style={{
            fontSize: 30,
          }}>
            {title}
          </Text>
        </View>
        {target}
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: 'darkseagreen',
      }}>
        <TouchableHighlight onPress={() => setState('feed')}>
          <Entypo style={styles.icon} name='news' size={36} color='black' />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setState('org')}>
          <Octicons style={styles.icon} name='organization' size={36} color='black' />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setState('notice')}>
          <Entypo style={styles.icon} name='notification' size={36} color='black' />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setState('profile')}>
          <AntDesign style={styles.icon} name='profile' size={36} color='black' />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default function App() {
  const [logined, setLogin] = React.useState(true);
  const loginCheck = () => {
    AsyncStorage.getItem('username')
      .then((username) => {setLogin(Boolean(username))});
  };

  loginCheck();

  return (
    <NavigationContainer>
      {logined ? <MainView /> : <LoginView onLogin={loginCheck} />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  }
});
