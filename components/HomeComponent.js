import React from 'react';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Loading } from './LoadingComponent';

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return (
            <ScrollView>
                <Text>Home Page</Text>
            </ScrollView>
        );
    }
}

export default Home;
