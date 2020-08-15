import React, {useState, useEffect} from 'react';
import { View, Image, ScrollView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {hostaddr} from '../config'

const ProfileView = ({navigation}) => {
    const total = 0;
    const [loading, setLoading] = useState(true);
    const logout = () => {
        fetch(hostaddr + '/logout')
        .then(() => navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }));
    }

    useEffect(() => {
        setLoading(true);
    });

    return (
        <ScrollView style={{
            flex: 1,
        }}>
            <View style={[styles.base, {
                flexDirection: 'row',
            }]}>
                <Image
                    style={{
                        marginVertical: 10,
                        marginHorizontal: 20,
                        height: 50,
                        width: 50,
                    }}
                    resizeMode='cover'
                    source={require('../assets/favicon.png')} 
                />
                <Text style={{
                    fontSize: 25,
                }}>
                    이름
                </Text>
                <View style={{flex: 1}}></View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <TouchableHighlight onPress={logout}>
                        <MaterialCommunityIcons name="logout" size={38} color="black" />
                    </TouchableHighlight>
                    <Text style={{fontSize: 10}}>
                        Logout
                    </Text>
                </View>
            </View>
            {total == 0 ? (
            <View style={[styles.base, styles.row , {justifyContent: 'center'}]}>
                <Text style={{
                    fontSize: 25,
                }}>
                    아직 기부 내역이 없습니다
                </Text>
            </View>) : (
                <View style={[styles.base, styles.row]}>
                <Text>
                    그 동안 기부한 총 금액은
                </Text>
                <Text style={{
                    fontSize: 40
                }}>
                    {total + '원'}
                </Text>
            </View>
            )
            }
            <View style={[styles.base, styles.row]}>
                <Text>
                    요약
                </Text>
                <Text style={{
                    fontSize: 25,
                    marginVertical: 15,
                }}>
                    아직 활동이 없습니다
                </Text>
            </View>
            <View style={[styles.base, styles.row]}>
                <Text>
                    당신의 소속 단체는
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    row: {
        height: 120,
    }
  });

export default ProfileView;