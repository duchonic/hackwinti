import React from 'react';

import {ScrollView, FlatList} from 'react-native';
import { Tile } from 'react-native-elements';

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

class Messages extends React.Component {


    render() {
        const renderMessage = ({ item, index }) => {
            return (
                <Tile
                    key={index}
                    title={item.title}
                    caption={item.message}
                    featured
                />
            );
        };
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking?</Text>
                    <Switch style={styles.formItem} value={this.state.smoking} trackColor='#512DA8' onValueChange={value => this.setState({ smoking: value })} />
                </View>
                <FlatList
                    data={this.props.messages.messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id.toString()}>
                </FlatList>
            </ScrollView>
        );
    }
}