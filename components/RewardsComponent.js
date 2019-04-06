import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = state => {
    return {
        rewards: state.rewards
    };
};

class Rewards extends React.Component {

    static navigationOptions = {
        title: 'Rewards'
    };

    render() {

        const { navigate } = this.props.navigation;

        // if (this.props.rewards.isLoading) {
        //     return <Loading/>;
        // } else if (this.props.rewards.errMsg) {
        //     return <View><Text>{this.props.rewards.errMsg}</Text></View>
        // }

        // const renderReward = ({ item, index }) => {
        //     return (
        //         <Tile
        //             key={index}
        //             title={item.name}
        //             caption={item.description}
        //             featured
        //             onPress={() => navigate('RewardsDetails', {rewardId: item.id})}
        //             imageSrc={{uri: baseUrl + item.image}}
        //         />
        //     );
        // };

        return (

            <FlatList
                // data={this.props.rewards.rewards}
                // renderItem={renderReward}
                // keyExtractor={item => item.id.toString()}
            />
        );
    }
}


export default connect(mapStateToProps)(Rewards);
