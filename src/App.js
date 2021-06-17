import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import React from 'react';
import Router from './router';
const Home = () => (
  <NavigationContainer>
    <Router />
    <FlashMessage position="top" />
  </NavigationContainer>
);

export default Home;
