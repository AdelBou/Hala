import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Chat from './components/chat';

const RouterComponent = () => {
  return (
          <Router  sceneStyle={{backgroundColor : 'white' }}>
          <Scene key="root">
              <Scene key="login" component={LoginForm} hideNavBar={true} initial />
              <Scene key="chat" component={Chat}  hideNavBar={true} title="chatroom"  />
          </Scene >
          </Router>
  );
};

export default RouterComponent;
  