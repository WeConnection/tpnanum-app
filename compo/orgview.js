import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import hostaddr from '../config'

const OrgIcon = (props) => {
    return (
        <TouchableHighlight>
            <Image source={{uri: props.imageUri}} />
            <Text>
                {props.name}
            </Text>
            <Text>
                {props.tags[0]}
            </Text>
        </TouchableHighlight>
    );
}

const OrgView = () => {
    return (
        <View>

        </View>
    );
};

export default OrgView;