import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import { ScrollView, Text, View, Image, TouchableHighlight, useWindowDimensions, Alert } from 'react-native';
import {hostaddr} from '../config'

const OrgIcon = (props) => {
    return (
        <View style={props.style}>
            <TouchableHighlight>
                <Image source={require('../assets/favicon.png')} style={{
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
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getContents = (orgs) => {
        const count = orgs.length;
        let contents = [];

        for(let i = 0; i < count / fit; i++)
        {
            let row = [];
            for(let j = 0; (j < fit) && (i * fit + j < count); j++)
            {
                row.push(<OrgIcon key={j.toString()} name={orgs[i * fit + j].name} tags={orgs[i * fit + j].tags} style={{
                    marginHorizontal: 20,
                    alignItems: 'center',
                }} />);
            }
            
            contents.push(
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 5,
                    marginVertical: 20,
                }} key={i.toString()}>
                    {row}
                </View>
            );
        }
        
        return contents;
    };

    useEffect(() => {
        setLoading(true);
        fetch(hostaddr + '/org/list', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(json => {
            const orgs = json['orgs'];
            setContents(getContents(orgs));
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
            AsyncStorage.setItem('username', '').then(() => navigation.navigate('Login'));
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <ScrollView style={{
            flex: 1,
            flexDirection: 'column',
            marginHorizontal: 20,
            marginVertical: 10,
        }}>
            {loading ? <Text>로딩중</Text> : contents}
        </ScrollView>
    );
};

export default OrgView;