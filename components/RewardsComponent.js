import React from 'react';
import { View, ScrollView, StyleSheet, Button, Badge, FlatList, Text } from 'react-native';
import { Tile, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import { Platform, TouchableOpacity, ProgressBarAndroid, ProgressViewIOS } from 'react-native';

const mapStateToProps = state => {
    return {
        rewards: state.rewards
    };
};

class Rewards extends React.Component {

  constructor(){
    super();
    this.state = {
      performance: 0.1,
      taskperweek: 0.0,
    }
  }

  static navigationOptions = {
      title: 'Rewards',
  };

  handleEventMissed() {
      console.log("missed one");
      this.setState({performance: this.state.performance - 0.1})
      if(this.state.performance < 0){
        this.state.performance = 0.0;
      }
  }

  handleTaskDone() {
    console.log("done one");
    if(this.state.performance < 1.0){
      this.setState({performance: this.state.performance + 0.1})
    }
    if(this.state.performance>1.0){
      this.state.performance=1.0;
    }

    if(this.state.taskperweek < 1){
      this.setState({taskperweek: this.state.taskperweek + 0.1})
    }
    if(this.state.taskperweek>1.0){
      this.state.taskperweek=1.0;
    }
  }

  render() {
      const { navigate } = this.props.navigation;

      if (this.props.rewards.isLoading) {
          return <Loading/>;
      } else if (this.props.rewards.errMsg) {
          return <View><Text>{this.props.rewards.errMsg}</Text></View>
      }

      const renderRewards = ({ item, index }) => {
          console.log('value: ' + item.value);
          if (item.id == 0){
            return (
              <ListItem
                containerStyle={{backgroundColor:
                    (item.value < 50 ? 'red': 'green')}}
                key={index}
                title={item.name + ' actual val: ' + (this.state.performance*100)}
                subtitle={item.description}
              />
            );
          }
          else{
            return(
              <ListItem
                containerStyle={{backgroundColor:
                    (item.value < 50 ? 'red': 'green')}}
                key={index}
                title={item.name + ' actual val: ' + (this.state.taskperweek*100)}
                subtitle={item.description}
              />
            );
          }
      };

      return (
          <ScrollView>
              <View style={styles.formRow}>
                  <FlatList
                      data={this.props.rewards.rewards}
                      renderItem={renderRewards}
                      keyExtractor={item => item.id.toString()}
                  />
              </View>
              <View>
                    <Text style = {{fontSize: 20, color: '#000'}}> performance: { parseFloat((this.state.performance * 100).toFixed(3))} %</Text>{
                        ( Platform.OS === 'android' )
                        ?
                          ( <ProgressBarAndroid styleAttr = "Horizontal" progress = { this.state.performance } indeterminate = { false } /> )
                        :
                          ( <ProgressViewIOS progress = { this.state.performance } /> )
                    }
              </View>
              <View>
                    <Text style = {{fontSize: 20, color: '#000'}}> taskperweek: { parseFloat((this.state.taskperweek * 100).toFixed(3))} %</Text>{
                        ( Platform.OS === 'android' )
                        ?
                          ( <ProgressBarAndroid styleAttr = "Horizontal" progress = { this.state.taskperweek } indeterminate = { false } /> )
                        :
                          ( <ProgressViewIOS progress = { this.state.taskperweek } /> )
                    }
              </View>
              <View style={styles.formRow}>
                  <Button onPress={() => this.handleEventMissed()}
                      title='Missed Event' color='#512DA8' />
              </View>
              <View style={styles.formRow}>
                  <Button onPress={() => this.handleTaskDone()}
                      title='Task done' color='#512DA8' />
              </View>
          </ScrollView>
      );
  }
}

const styles = StyleSheet.create({

  MainContainer:
  {
    flex: 1,
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    margin: 20
  },

  button: {
  width: '100%',
  backgroundColor: '#00BCD4',
  borderRadius:5,
  padding: 10,
  marginTop: 10,

  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
    fontWeight: 'bold',
  },
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
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});


export default connect(mapStateToProps)(Rewards);
