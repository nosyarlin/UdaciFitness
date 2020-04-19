import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={{backgroundColor, ...props}}/>
    </View>
  );
}

const Tab = Platform.os === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator();

function NavigationTabs() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='ios-bookmarks' size={30} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Add Entry"
        component={AddEntry}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='plus-square' size={30} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
          <NavigationTabs/>
        </View>
      </Provider>
    </NavigationContainer>
  );
}
