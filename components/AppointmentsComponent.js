import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
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
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('ApponmentDetails', {appointmentId: item.id})}
                    imageSrc={{uri: baseUrl + item.image}}
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
