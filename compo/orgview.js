import React from 'react';
import { ScrollView, Text, View, Image, TouchableHighlight, useWindowDimensions } from 'react-native';
import hostaddr from '../config'

const OrgIcon = (props) => {
    return (
        <View>
            <TouchableHighlight>
                <Image source={require('../assets/favicon.png')} />
            </TouchableHighlight>
            <Text>
                이름
            </Text>
            <Text>
                테그, 테그
            </Text>
        </View>
    );
}

const OrgView = () => {
    const width = useWindowDimensions().width;
    const count = 10;
    const fit = parseInt(width / 120);
    let contents = [];

    for(let i = 0; i < count / fit; i++)
    {
        let row = [];
        for(let j = 0; (j < fit) && (i * fit + j < count); j++)
        {
            row.push(<OrgIcon />);
        }
        
        contents.push(
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginHorizontal: 10,
                marginVertical: 20,
            }}>
                {row}
            </View>
        );
    }

    return (
        <ScrollView style={{
            flex: 1,
            flexDirection: 'column',
            marginHorizontal: 20,
            marginVertical: 10,
        }}>
            {contents}
        </ScrollView>
    );
};

export default OrgView;