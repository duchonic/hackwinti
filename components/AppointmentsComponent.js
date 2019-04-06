import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile, ListItem, Button } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = state => {
    return {
        appointments: state.appointments
    };
};

class Appointments extends React.Component {

    static navigationOptions = {
        title: 'Appointments'
    };

    render() {
        const { navigate } = this.props.navigation;

        if (this.props.appointments.isLoading) {
            return <Loading/>;
        } else if (this.props.appointments.errMsg) {
            return <View><Text>{this.props.appointments.errMsg}</Text></View>
        }

        const renderAppointment = ({ item, index }) => {
            return (
                <ListItem 
                    containerStyle={{backgroundColor: (item.scope !='private' ? 'white': 'lightgrey')}}
                    key={index}
                    title={item.title}
                    subtitle={<View><Text>{new Date(item.date).toLocaleTimeString('de-CH')}<Text> </Text>{new Date(item.date).toLocaleDateString('de-CH-u-co-phonebk')}</Text><Text>{item.location}</Text></View>}
                    onPress={() => navigate('AppointmentDetails', {appointmentId: item.id})}
                />
            );
        };

        return (
            <View><FlatList
                data={this.props.appointments.appointments}
                renderItem={renderAppointment}
                keyExtractor={item => item.id.toString()}
            /><Button
                onPress={() => {return null}}
                title="add Appointment"
                color = "#841584"
            /></View>
        );
    }
}


export default connect(mapStateToProps)(Appointments);
