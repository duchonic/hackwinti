import React from 'react';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { Notifications } from 'expo';

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount() {
        Notifications.scheduleLocalNotificationAsync({ title: 'Job Interview tomorrow', body: '1. Go to bed early\n2. Set alarm\n3. Brush teeth' }, { time: new Date().getTime() + 3000 });
    }

    render() {
        return (
            <ScrollView>
                <Image source={require('./images/homeScreen.png')}/>
                <Text style={styles.body}>Social Services App</Text>
                <Icon name='smile-o' type='font-awesome' size={280} color={'yellow'} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 60,
        height: 140,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    body: {
        fontSize: 34,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 40
    }
});

export default Home;
