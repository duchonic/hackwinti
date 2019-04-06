import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile, ListItem, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import { Calendar, Permissions} from 'expo';

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    };
};

class Tasks extends React.Component {

    static navigationOptions = {
        title: 'Tasks'
    };

    componentDidMount() {
        Permissions.askAsync(Permissions.CALENDAR).then(data => {
            if (data.status == 'granted') {
                const calendars = Calendar.getCalendarsAsync();
                calendars.then((data) => console.log(data))
                    .catch(error => console.log(error));
                console.log(calendars);
            }
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        if (this.props.tasks.isLoading) {
            return <Loading/>;
        } else if (this.props.tasks.errMsg) {
            return <View><Text>{this.props.tasks.errMsg}</Text></View>
        }

        const renderTask = ({ item, index }) => {
            const dueDate = Date.parse(item.dueDate);
            const now = new Date().getTime();

            return (
                <ListItem
                    key={index}
                    subtitle={'Due: ' + new Date(Date.parse(item.dueDate)).toLocaleString("de") + '\nDays left: ' + Math.round((dueDate - now)/24/3600000)}
                    title={item.name}
                    onPress={() => navigate('TaskDetails', {taskId: item.id})}
                    leftIcon={<Icon name={item.category} type='font-awesome' size={30}/>}
                    rightIcon={<Icon name={now > dueDate ? 'frown-o' : 'smile-o' } type='font-awesome' color={(now > dueDate ? 'red': 'green')} size={40}/>}
                    bottomDivider
                    topDivider
                />
            );
        };

        return (
            <FlatList
                data={this.props.tasks.tasks.filter(task => !task.completed)}
                renderItem={renderTask}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}


export default connect(mapStateToProps)(Tasks);
