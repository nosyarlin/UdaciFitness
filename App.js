import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import Live from './components/Live';
import EntryDetail from './components/EntryDetail';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { setLocalNotification } from './utils/helpers';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={{backgroundColor, ...props}}/>
    </View>
  );
}

const Tabs = Platform.os === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator();

function NavigationTabs() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
        inactiveTintColor: 'gray',
      }}
      navigationOptions={{
        header: null,
      }}
    >
      <Tabs.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='ios-bookmarks' size={30} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="Add Entry"
        component={AddEntry}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='plus-square' size={30} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="Live"
        component={Live}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='speedometer' size={30} color={color}/>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const Stacks = createStackNavigator()

function NavigationStacks() {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        headerStatusBarHeight: 0
      }}
    >
      <Stacks.Screen
        name="Home"
        component={NavigationTabs}
        options={{
          header: () => null,
        }}
      />
      <Stacks.Screen
        name="EntryDetail"
        component={EntryDetail}
        headerTitle="Entry Detail"
      />
    </Stacks.Navigator>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <NavigationContainer>
        <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
            <NavigationStacks/>
          </View>
        </Provider>
      </NavigationContainer>
    );
  }
}
