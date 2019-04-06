import React, { Component } from 'react';
import { ScrollView, View, Platform, Image, StyleSheet, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchTasks, fetchComments } from '../redux/ActionCreators';

// rewards stuff
import { fetchRewards } from '../redux/ActionCreators';

import Tasks from './TasksComponent';
import Rewards from './RewardsComponent';

import Home from './HomeComponent';

import TaskDetails from './TaskDetailsComponent';
import RewardDetails from './RewardDetailsComponent';

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    rewards: state.rewards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
    fetchComments: () => dispatch(fetchComments()),
    fetchRewards: () => dispatch(fetchRewards())
  };
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 3 }}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
},
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
    })
  }
);

const TasksNavigator = createStackNavigator({
  Tasks: {
    screen: Tasks,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name='tasks' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
    })
  },
  TaskDetails: { screen: TaskDetails }
},
  {
    initialRouteName: 'Tasks',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
);

const RewardsNavigator = createStackNavigator({
  Rewards: {
    screen: Rewards,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
    })
  },
  RewardDetails: { screen: RewardDetails }
},
  {
    initialRouteName: 'Rewards',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
);

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='home' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
  Menu: {
    screen: TasksNavigator,
    navigationOptions: {
      title: 'Tasks',
      drawerLabel: 'Tasks',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='list' type='font-awesome' size={24} color={tintColor} />
      )
    },
    screen: RewardsNavigator,
    navigationOptions: {
      title: 'Rewards',
      drawerLabel: 'Rewards',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='trophy' type='font-awesome' size={24} color={tintColor} />
      )
    }
  }
},
  {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
  });



class Main extends Component {
  componentDidMount() {
    this.props.fetchTasks();
    this.props.fetchComments();
    this.props.fetchRewards();
  }

  render() {

    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    //width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
