import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Card, Icon } from 'react-native-elements';
import { postTaskCompleted } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postTaskCompleted: taskId => dispatch(postTaskCompleted(taskId))
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
function RenderTask(props) {
    const task = props.task;

    if (task != null) {
        return (
            <Card featuredTitle={task.name} image={{ uri: baseUrl + task.image }}>
                <Text style={{ margin: 10 }}>{task.description}</Text>
                <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
            </Card>
        );
    } else {
        return <View />;
    }
}


class TaskDetails extends React.Component {
    static navigationOptions = {
        title: 'Task Details'
    };

    markFavorite(taskId) {
        this.props.postTaskCompleted(taskId);
    }

    render() {
        const taskId = this.props.navigation.getParam('taskId', '');
        return (
            <ScrollView>
                <RenderTask task={this.props.tasks.tasks[+taskId]} favorite={this.props.favorites.some(el => el === taskId)} onPress={() => this.markFavorite(taskId)} />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.taskId === taskId)} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
