import React, { Component } from 'react';
import { ScrollView, View, Platform, Image, StyleSheet, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchTasks, fetchComments, fetchMessages, fetchAppointments, clearAll } from '../redux/ActionCreators';

// rewards stuff
import { fetchRewards } from '../redux/ActionCreators';

import Tasks from './TasksComponent';
import Rewards from './RewardsComponent';

import Home from './HomeComponent';
import Messages from './MessagesComponent';
import TaskDetails from './TaskDetailsComponent';
import Appointments from './AppointmentsComponent';
import AppointmentDetails from './AppointmentDetailsComponent';
import RewardDetails from './RewardDetailsComponent';

import BackEndManager from './BackEndManager';

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
    fetchAppointments: () => dispatch(fetchAppointments()),
    fetchRewards: () => dispatch(fetchRewards()),
    fetchMessages: () => dispatch(fetchMessages()),
    clearAll: () => dispatch(clearAll())
  };
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 3 }}>
          <Image source={require('./images/logoWinti.png')} style={styles.drawerImage} />
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MessagesNavigator = createStackNavigator({
  Messages: { screen: Messages }
},
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#3366cc'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
    })
  }
);

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
},
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#3366cc'
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
      headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
    })
  },
  TaskDetails: { screen: TaskDetails }
},
  {
    initialRouteName: 'Tasks',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#3366cc'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
);

const AppointmentsNavigator = createStackNavigator({
  Appointments: {
    screen: Appointments,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
    })
  },
  AppointmentDetails: { screen: AppointmentDetails }
},
  {
    initialRouteName: 'Appointments',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#3366cc'
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
        backgroundColor: '#3366cc'
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
  Messages: {
    screen: MessagesNavigator,
    navigationOptions: {
      title: 'Messages',
      drawerLabel: 'Messages',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='comments' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
  Tasks: {
    screen: TasksNavigator,
    navigationOptions: {
      title: 'Tasks',
      drawerLabel: 'Tasks',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='list' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
  Rewards: {
    screen: RewardsNavigator,
    navigationOptions: {
      title: 'Rewards',
      drawerLabel: 'Rewards',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='trophy' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
  Appointments: {
    screen: AppointmentsNavigator,
    navigationOptions: {
      title: 'Appointment',
      drawerLabel: 'Appointment',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='calendar' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
},
  {
    drawerBackgroundColor: '#fff',
    contentComponent: CustomDrawerContentComponent
  });


// const mBackEnd = new BackEndManager();
// console.log('type: ' + mBackEnd);
// taskPerDay();
// console.log('get: ' + taskPerDay());
// console.log('get: ' + performance());


class Main extends Component {
  componentDidMount() {
    this.loadData(this.props);
    let timer = setInterval( () => this.loadData(this.props), 4000);
  }

  loadData(props) {
    // props.clearAll();
    props.fetchMessages();
    props.fetchTasks();
    props.fetchComments();
    props.fetchRewards();
    props.fetchAppointments();
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
    backgroundColor: '#3366cc',
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
