import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Chat from './components/chat';
import EmailUs from './components/EmailUs';

const RouterComponent = () => {
  return (
          <Router  navigationBarStyle={{ backgroundColor: '#238AC5' }}  titleStyle={{color :'#fff'}} sceneStyle={{backgroundColor:'#238AC5'}}>
            <Scene key="root" >
                  <Scene tabBarStyle={styles.tabBarStyle} key="login" component={LoginForm} hideNavBar initial />
                  <Scene tabBarStyle={styles.tabBarStyle} key="emailUs" title="راسلنا" component={EmailUs} />
                  <Scene tabBarStyle={styles.tabBarStyle} key="chat" type="replace" hideNavBar component={Chat} />
            </Scene >
          </Router>
  );
};
const  styles={
tabBarStyle: {
        backgroundColor: '#eeeeee',
        indicatorStyle : {
            color: '#238AC5'
        },
    }
}

export default RouterComponent;
  