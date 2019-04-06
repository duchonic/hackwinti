import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Card, Icon, Rating } from 'react-native-elements';
import { postTaskCompleted } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
        postTaskCompleted: task => dispatch(postTaskCompleted(task))
});

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating readonly startingValue={+item.rating} imageSize={16}/>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + new Date(Date.parse(item.date)).toLocaleString("de")}</Text>
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
            <Card featuredTitle={task.name} image={{ uri: baseUrl + task.image }} featuredSubtitle={new Date(Date.parse(task.dueDate)).toLocaleString("de")}>
                <Text style={{ margin: 10 }}>{task.description}</Text>
                <Icon raised reverse name={props.favorite ? 'thumbs-up' : 'thumbs-up'} type='font-awesome' color='#f50'
                    onPress={() => props.success()} />
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

    taskSuccess(task) {
        this.props.postTaskCompleted(task);
        const { navigate } = this.props.navigation;
        navigate('Tasks');
    }

    render() {
        const taskId = this.props.navigation.getParam('taskId', '');
        const task = this.props.tasks.tasks[+taskId];
        return (
            <ScrollView>
                <RenderTask task={task} success={() => this.taskSuccess(task)} />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.taskId === taskId)} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
