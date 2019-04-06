import React from 'react';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { Notifications } from 'expo';
import { Speech } from 'expo';

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount() {
        Notifications.scheduleLocalNotificationAsync({ title: 'title', body: 'body' }, { time: new Date().getTime() + 3000 });
        Speech.speak("well done", { language: 'en' });
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.header}>Stadt Winterthur</Text>
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
        paddingBottom: 40
    }
});

export default Home;
