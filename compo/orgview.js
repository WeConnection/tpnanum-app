import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import { FlatList, Text, View, Image, TouchableHighlight, useWindowDimensions, Alert } from 'react-native';
import {hostaddr} from '../config'

const OrgIcon = (props) => {
    return (
        <View style={props.style}>
            <TouchableHighlight>
                <Image source={props.imageURL ? {uri: hostaddr + props.imageURL} : require('../assets/favicon.png')} style={{
                    height: 60,
                    width: 60,
                    resizeMode: 'cover',
                }} />
            </TouchableHighlight>
            <Text>
                {props.name}
            </Text>
        </View>
    );
}

const OrgView = () => {
    const width = useWindowDimensions().width;
    const fit = parseInt(width / 120);
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
            AsyncStorage.setItem('username', '');
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 10,
        }}>
            {loading ? <Text>로딩중</Text> : 
            <FlatList 
                data={orgs}
                renderItem={({item}) => 
                <OrgIcon 
                    name={item.name}
                    style={{
                        alignItems: 'center',
                        marginVertical: 10,
                        marginHorizontal: 20,
                    }}
                    imageURL={item.imageURL}
                />}
                numColumns={fit}
            />}
        </View>
    );
};

export default OrgView;