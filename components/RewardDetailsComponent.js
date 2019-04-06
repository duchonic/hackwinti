import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Card, Icon } from 'react-native-elements';
import { postRewardCompleted } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        rewards: state.rewards,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postRewardCompleted: rewardId => dispatch(postRewardCompleted(rewardId))
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
function RenderReward(props) {
    const reward = props.reward;

    if (reward != null) {
        return (
            <Card featuredTitle={reward.name} image={{ uri: baseUrl + reward.image }}>
                <Text style={{ margin: 10 }}>{reward.description}</Text>
                <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
            </Card>
        );
    } else {
        return <View />;
    }
}


class RewardDetails extends React.Component {
    static navigationOptions = {
        title: 'Reward Details'
    };

    markFavorite(rewardId) {
        this.props.postRewardCompleted(rewardId);
    }

    render() {
        const rewardId = this.props.navigation.getParam('rewardId', '');
        return (
            <ScrollView>
                <RenderReward reward={this.props.rewards.rewards[+rewardId]} favorite={this.props.favorites.some(el => el === rewardId)} onPress={() => this.markFavorite(rewardId)} />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.rewardId === rewardId)} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RewardDetails);
