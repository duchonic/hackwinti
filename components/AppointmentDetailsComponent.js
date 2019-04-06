import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Card, Icon } from 'react-native-elements';
import { postAppointmentCompleted } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        appointments: state.appointments,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postAppointmentCompleted: appointmentId => dispatch(postAppointmentCompleted(appointmentId))
    }
};

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating}</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    };
    return (
        <Card title='Comments'>
            <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
        </Card>
    );
}
function RenderAppointment(props) {
    const appointment = props.appointment;

    if (appointment != null) {
        return (
            <Card featuredTitle={appointment.name} image={{ uri: baseUrl + appointment.image }}>
                <Text style={{ margin: 10 }}>{appointment.description}</Text>
                <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
            </Card>
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
                <RenderAppointment appointment={this.props.appointments.appointments[+appointmentId]} favorite={this.props.favorites.some(el => el === appointmentId)} onPress={() => this.markFavorite(appointmentId)} />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.appointmentId === appointmentId)} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);
