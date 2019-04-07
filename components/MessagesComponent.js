import React from 'react';

import {ScrollView, FlatList, StyleSheet, View, TextInput, Text} from 'react-native';
import { Tile, Button, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';

import {postMessage} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};
const mapDispatchToProps = dispatch => {
    return {
        postMessage: messageText => dispatch(postMessage(messageText))
    }
};

class Messages extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            messageText: ''
        };
    }
    static navigationOptions = {
        title: 'Messages'
    };

    handlePost() {
        this.props.postMessage(this.state.messageText);
        this.setState({messageText: ''});
    }

    render() {
        const renderMessage = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={<View><Text>{item.author}</Text><Text>{new Date(Date.parse(item.date)).toLocaleString("de")}</Text></View>}
                    subtitle={item.message}
                />
            );
        };
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <TextInput style={styles.formItem}
                        onChangeText={(messageText) => this.setState({messageText})}
                        value={this.state.messageText}
                    />
                    <Button style={styles.formLabel} title='Send' onPress={() => this.handlePost()}/>
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


const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
