import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableHighlight, useWindowDimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import {hostaddr} from '../config'

const Loading = () => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={100} />
        </SafeAreaView>
    );
};

const OrgIcon = (props) => {
    return (
        <View style={props.style}>
            <Image source={props.imageURL ? {uri: hostaddr + props.imageURL} : require('../assets/favicon.png')} 
                style={{
                    height: 60,
                    width: 60,
                    resizeMode: 'cover',
                }}
            />
            <Text style={{
                    fontSize: 18,
                    marginVertical: 5,
                }}
                numberOfLines={1}
            >
                {props.name}
            </Text>
            <Text style={{
                    fontSize: 14,
                    marginVertical: 5,
                }}
                numberOfLines={5}
            >
                {props.desc}
            </Text>
        </View>
    );
}

const OrgDetail = ({navigation, route}) => {
    return (
        <SafeAreaView>
            <Text>{route.params.id}</Text>
        </SafeAreaView>
    );
};

const Stack = createStackNavigator();

const Home = ({navigation, route}) => {
    const width = useWindowDimensions().width;
    const fit = parseInt(width / 200);
    
    const orgs = route.params.orgs;

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}> 
            <FlatList 
                data={orgs}
                renderItem={({item}) => 
                (<TouchableHighlight onPress={() => 
                    navigation.navigate(item.id, {
                        ...item
                    })}>
                    <OrgIcon 
                        name={item.name}
                        desc={item.desc}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            height: 260,
                            width: 180,
                            paddingVertical: 30,
                            paddingHorizontal: 20,
                            marginHorizontal: 10,
                            marginVertical: 10,
                            backgroundColor: 'white',
                        }}
                        imageURL={item.imageURL}
                    />
                </TouchableHighlight>)}
                numColumns={fit}
            />
        </View>
    );
};

const OrgView = ({navigation}) => {
    const [orgs, setOrgs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(hostaddr + '/org/list', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(json => {
            setOrgs(json['orgs']);
        })
        .catch(err => {
            Alert.alert(
            '세션 만료',
            String(err),
            [
              {
                text: '닫기',
                style: 'cancle',
              },
            ],
            {cancelable: false},
            );
            AsyncStorage.setItem('username', '')
            .then(() => navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }));
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        loading ? <Loading /> : 
        <Stack.Navigator>
            <Stack.Screen name="Home" 
                component={Home}
                initialParams={{orgs: orgs}}
            />
            {orgs.map((item) => <Stack.Screen name={item.id} component={OrgDetail} key={item.id} />)}
        </Stack.Navigator>
    );
}

export default OrgView;