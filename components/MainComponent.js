import React, { Component } from 'react';
import { ScrollView, View, Platform, Image, StyleSheet, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchTasks } from '../redux/ActionCreators';

import Tasks from './TasksComponent';
import Home from './HomeComponent';
import TaskDetails from './TaskDetailsComponent';

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks())
  };
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Winti Hack</Text>
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
  Menu: {
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
    width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
