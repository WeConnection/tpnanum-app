import React, {useState, useEffect} from 'react';
import { View, Image, ScrollView, Text, StyleSheet } from 'react-native';
import {hostaddr} from '../config'

const ProfileView = () => {
    const total = 0;
    const [loading, setLoading] = useState(true);

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
                    fontSize: 30,
                }}>
                    이름
                </Text>
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
                    0원
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