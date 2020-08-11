import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Entypo, Octicons, AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginView from './compo/loginview';
import FeedView from './compo/feedview';
import OrgView from './compo/orgview';
import NoticeView from './compo/noticeview';
import ProfileView from './compo/profileview';

const Tab = createBottomTabNavigator();

const MainView = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return {
            Feed: <Entypo name='news' size={size} color={color} />,
            Org: <Octicons name='organization' size={size} color={color} />,
            Notice: <Entypo name='notification' size={size} color={color} />,
            Profile: <AntDesign name='profile' size={size} color={color} />,
          }[route.name];
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Feed" component={FeedView} />
      <Tab.Screen name="Org" component={OrgView} />
      <Tab.Screen name="Notice" component={NoticeView} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function App() {
  const [logined, setLogin] = React.useState(false);
  const loginCheck = async () => {
    await AsyncStorage.getItem('username')
      .then((username) => {
        setLogin(Boolean(username));
      });
  };

  loginCheck();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={logined ? "Main" : "Login"}>
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Main" component={MainView} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
