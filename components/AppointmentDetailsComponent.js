import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Card, Icon, List, ListItem } from 'react-native-elements';
import { postAppointmentCompleted } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        appointments: state.appointments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postAppointmentCompleted: appointmentId => dispatch(postAppointmentCompleted(appointmentId))
    }
};
function RenderLinkItem({item,index}) {
    return (<ListItem
        title={item}
        subtitle=''
        avatar={{ uri: item }}
    />);
}
function getParticipantsString(participants) {
    let participantLabel = '';
    for (let participant of participants) {
        participantLabel += participant + ","
    }
    return participantLabel;
}
function getLinkList(links) {
    if (links.length > 0) {
        return (
            <FlatList
                data={links}
                renderItem={RenderLinkItem}
                keyExtractor={item => item}
            />
        );
    } else {
        return <Text>No Files</Text>
    }
}
function RenderAppointment(props) {
    const appointment = props.appointment;

    if (appointment != null) {
        return (
            <View>
                <Card featuredTitle={appointment.title} >
                    <Text>{new Date(appointment.date).toLocaleTimeString('de-CH')}<Text>
                    </Text>{new Date(appointment.date).toLocaleDateString('de-CH-u-co-phonebk')}</Text>
                    <Text>{appointment.location}</Text>
                    <Text>{getParticipantsString(appointment.participants)}</Text>
                    <Text style={{ margin: 10 }}>{appointment.duration}</Text>
                    <Text style={{ margin: 10 }}>{appointment.description}</Text>
                </Card>
                {getLinkList(appointment.files)}
            </View>
        );
    } else {
        return <View />;
    }
}


class AppointmentDetails extends React.Component {
    static navigationOptions = {
        title: 'Appointment Details'
    };

    markFavorite(appointmentId) {
        this.props.postAppointmentCompleted(appointmentId);
    }

    render() {
        const appointmentId = this.props.navigation.getParam('appointmentId', '');
        return (
            <ScrollView>
                <RenderAppointment appointment={this.props.appointments.appointments[+appointmentId]} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);
