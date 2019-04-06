import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    };
};

class Tasks extends React.Component {

    static navigationOptions = {
        title: 'Tasks'
    };

    render() {
        const { navigate } = this.props.navigation;

        if (this.props.tasks.isLoading) {
            return <Loading/>;
        } else if (this.props.tasks.errMsg) {
            return <View><Text>{this.props.tasks.errMsg}</Text></View>
        }

        const renderTask = ({ item, index }) => {
            return (
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('TaskDetails', {taskId: item.id})}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        return (
            <FlatList
                data={this.props.tasks.tasks}
                renderItem={renderTask}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}


export default connect(mapStateToProps)(Tasks);
