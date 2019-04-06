import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile, ListItem } from 'react-native-elements';
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
                    key={index}
                    title={item.title}
                    subtitle={item.location}
                    onPress={() => navigate('ApponmentDetails', {appointmentId: item.id})}
                />
            );
        };

        return (
            <FlatList
                data={this.props.appointments.appointments}
                renderItem={renderAppointment}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}


export default connect(mapStateToProps)(Appointments);
