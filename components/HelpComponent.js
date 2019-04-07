import React from 'react';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { Notifications } from 'expo';

class Help extends React.Component {

    static navigationOptions = {
        title: 'Help'
    };

    componentDidMount() {
        Notifications.scheduleLocalNotificationAsync({ title: 'Job Interview tomorrow', body: '1. Go to bed early\n2. Set alarm\n3. Brush teeth' }, { time: new Date().getTime() + 3000 });
    }

    render() {
        return (
            <View>
                <Card>
                    <Text>What to do in my freetime?</Text>
                    <Divider style={{ backgroundColor: 'blue' }} />
                    <Text>dance class</Text>
                    <Text>playing football</Text>
                    <Text>reading</Text>
                    <Text>playing tennis</Text>
                    <Text>playing an instrument</Text>
                    <Text>learing to programm</Text>
                    <Text>creating youtube videos</Text>
                    <Text>skydiveing</Text>
                    <Text>diveing</Text>
                </Card>
                <Card>
                    <Text>How to fill out my taxes?</Text>
                    <Divider style={{ backgroundColor: 'blue' }} />
                    <Text>You can find an explanation video on youtube on how to fill in the basics of yout tax information.</Text>
                    <Text>Look for the playlist taxes on https://www.youtube.com/user/StadtWinterthur.</Text>
                </Card>
            </View>
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

export default Help;
